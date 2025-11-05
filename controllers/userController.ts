import {userModel, User} from "../models/userModel";

type AuthResult = 
  | { success: true; user: User }
  | { success: false; message: string };

const getUserByEmailIdAndPassword = (email: string, password: string): AuthResult => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return { success: true, user };
    } else {
      return { success: false, message: "Password is incorrect" };
    }
  }
  return { success: false, message: `Couldn't find user with email: ${email}` };
};
const getUserById = (id: number): User | null => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: User, password: string): boolean {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
