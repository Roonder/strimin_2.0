import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import Strimer from "./models/StrimerModel";

/**
 * @param {NextRequest} req
 */
export async function middleware(req) {
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
    // Method to check if there's any route matching with the current path
    function testPath(route) {
        const validator = new RegExp("^" + route + "$");
        return validator.test(path);
    }
    
    // First block - Check if logged
    const path = req.nextUrl.pathname;
    const token = req.cookies.get('token')?.value || '';

    // if(isPublicPath.some(testPath) && token) return NextResponse.redirect('/dashboard');

    // if(!isPublicPath.some(testPath) && !token) return NextResponse.redirect('/login')

    
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

