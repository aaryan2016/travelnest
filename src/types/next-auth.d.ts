import 'next-auth'
import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string;
        username?: string;
    }

    interface Session extends DefaultSession {
        expires: string;
        user: {
            _id?: string;
            username?: string;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        username?: string;
    }
}