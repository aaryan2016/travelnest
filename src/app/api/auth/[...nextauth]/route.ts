// import { handlers } from "@/server/auth";

// export const { GET, POST } = handlers;

import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }