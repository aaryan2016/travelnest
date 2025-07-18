// import { handlers } from "@/server/auth";

// export const { GET, POST } = handlers;

import NextAuth from "next-auth";
import { authOptions } from "./options";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }