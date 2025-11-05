import { Strategy as GitHubStrategy } from "passport-github2";
import { userModel, User } from "../../models/userModel";
import { PassportStrategy } from '../../interfaces/index';
import { VerifyCallback } from "passport-oauth2";

const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: process.env.GITHUB_CALLBACK_URL as string,
  },
  (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
    let user = userModel.findByGithubId(profile.id);
    
    if (user) {
      return done(null, user);
    }
    
    const newUser: User = {
      id: Date.now(),
      name: profile.displayName || profile.username,
      githubId: profile.id,
      role: "user",
    };
    userModel.createUser(newUser);
    return done(null, newUser);
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: 'github',
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
