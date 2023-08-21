import { NextResponse, NextRequest } from "next/server";
import { verifyJWT } from "./lib/token";

/**
 * @param {NextRequest} req
 */
let redirectToLogin = false;
export async function middleware(req) {
    let token;
    const path = req.nextUrl.pathname;
    // Public Path's Directory
    const isPublicPath = [
        "/login",
        "/forgot-password",
        "/recover-password/(.*)",
        "/signup",
        "/confirm",
        "/api/strimers/forgot-password",
        "/api/strimers/login",
        "/api/strimers/signup",
        "/api/strimers/recover-password",
        "/api/strimers/confirm",
    ]
    // Private Path's Directory
    const isPrivatePath = [
        "/dashboard",
        "/api/strimers/profile",
        "/api/strimers/logout"
    ]
    // Method to check if there's any route matching with the current path
    function testPath(route) {
        const validator = new RegExp("^" + route + "$");
        return validator.test(path);
    }
    
    // Checking Token Existency and Public/Private Current Path
    if(req.cookies.has("token")) {
        token = req.cookies.get("token")?.value;
    } else if(req.headers.get("Authorization")?.startsWith("Bearer ")) {
        token = req.headers.get("Authorization")?.substring(7);
    }

    if(isPublicPath.some(testPath) && (!token || redirectToLogin)) return;

    // if(isPrivatePath.some(testPath) && !token) return NextResponse.json({error: "No has iniciado sesion. Por favor provee un token válido."}, {status: 401}).redirect('/login');
    if(isPrivatePath.some(testPath) && !token) return NextResponse.redirect(
        new URL(`/login?${new URLSearchParams({error: "badauth"})}`, req.url)
    );

    const response = NextResponse.next();

    try {
        if(token) {
            const verified = await verifyJWT(token);
            const {sub} = verified.payload;
            response.headers.set("X-USER-ID", sub);
            req.user = {id: sub}
        }
    } catch (error) {
        redirectToLogin = true;
        if(path.startsWith("/api")) return NextResponse.json({error: "El token es inválido, o el usuario no existe."}, {status: 401});

        console.log(error)
        return NextResponse.redirect(
            new URL(`/login?${new URLSearchParams({error: "badauth"})}`, req.url)
        );
    }

    const authUser = req.user;

    if(!authUser) return NextResponse.redirect(
            new URL(`/login?${new URLSearchParams({
                error: "badauth",
                forceLogin: "true",
            })}`,
            req.url
        )
    );

    if(isPublicPath.some(testPath) && authUser) return NextResponse.redirect(
        new URL("/dashboard", req.url)
    );

    return response;
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - _next/static (static files)
        * - _next/image (image optimization files)
        *
        * Or the ones that match "url.extension" to exclude images and such
        */
        "/((?!_next/static|_next/image|.*\\..*).*)",
    ]
}

