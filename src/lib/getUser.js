import { getServerSession } from 'next-auth'
import { NextAuthOptions } from './NextAuthOptions';

export const getUser = () => {
    return getServerSession(NextAuthOptions);
}