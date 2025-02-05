import { NextResponse, NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl

    // If the user is not authenticated and tries to access a protected route like /hotels
    if (!token && url.pathname.startsWith('/hotels/')) {
        // If not authenticated, redirect to the sign-in page with the original page's URL as a callbackUrl
        const signInUrl = new URL('/sign-in', request.url)
        signInUrl.searchParams.set('callbackUrl', url.href)  // Store the original destination URL
        return NextResponse.redirect(signInUrl)
    }

    if (token &&
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up')
        )
    ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // return NextResponse.redirect(new URL('/sign-in', request.url))
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/hotels/:path*'
    ],
}