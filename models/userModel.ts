interface User {
  id: number;
  name: string;
  email?: string;
  password?: string;
  githubId?: string;
  role: "user" | "admin";
}

const database: User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {

  findOne: (email: string): User | null => {
    const user = database.find((user) => user.email === email);
    return user || null;
  },
  findById: (id: number): User | null => {
    const user = database.find((user) => user.id === id);
    return user || null;
  },
  findByGithubId: (githubId: string): User | null => {
    const user = database.find((user) => user.githubId === githubId);
    return user || null;
  },
  createUser: (user: User): User => {
    database.push(user);
    return user;
  },
};

export { database, userModel, User };
