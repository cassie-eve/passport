import express from "express";
const router = express.Router();
import { ensureAuthenticated, ensureAdmin } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAdmin, (req, res) => {
  const sessionStore = req.sessionStore;
  
  if (!sessionStore || !sessionStore.all) {
    return res.status(500).send("Session store not available");
  }
  
  sessionStore.all((err, sessions) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching sessions");
    }
    
    res.render("admin", {
      user: req.user,
      sessions: sessions || {},
    });
  });
});

router.post("/admin/revoke/:sessionId", ensureAdmin, (req, res) => {
  const sessionStore = req.sessionStore;
  const sessionId = req.params.sessionId;
  
  if (!sessionStore || !sessionStore.destroy) {
    return res.status(500).send("Session store not available");
  }
  
  sessionStore.destroy(sessionId, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error revoking session");
    }
    res.redirect("/admin");
  });
});

export default router;
