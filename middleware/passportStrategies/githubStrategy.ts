import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "",
        clientSecret: "",
        callbackURL: "",
        passReqToCallback: true,
    },
    
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
        // TODO: Implement GitHub authentication logic
        done(null, false);
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
