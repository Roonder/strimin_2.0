import {connect} from "@/config/dbConfig";
import { getEnvVariable } from "@/helpers/getEnvVariables";
import { signJWT } from "@/lib/token";
import Strimer from "@/models/StrimerModel";

// Next Tools
import { NextResponse } from "next/server";

// Connect to the database
connect()

//Login an Strimer
export async function POST(req) {
    try {
        const body = await req.json();
        const {userOrEmail, password} = body;

        // Check if strimer already exists
        const authStrimer = await Strimer.findOne({$or: [
            {email: userOrEmail},
            {user: userOrEmail}
        ]});
        if(!authStrimer) return NextResponse.json({error: "El usuario no existe"}, {status: 400})

        // Check if confirmed
        if(!authStrimer.confirmed) return NextResponse.json({error: "Usuario no confirmado"}, {status: 400});

        // Check the password
        if(await authStrimer.checkPassword(password)) return NextResponse.json({error: "Contraseña inválida"}, {status: 400});

        const JWT_EXPIRES_IN = getEnvVariable("TOKEN_EXPIRES_IN");

        // Sign Token and Authenticate

        const token = await signJWT(
            {sub: authStrimer._id},
            {exp: `${JWT_EXPIRES_IN}d`}
        );

        const maxTokenAge = parseInt(JWT_EXPIRES_IN) * 60 * 43200;

        const cookieOptions = {
            name: "token",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV !== "development",
            maxAge: maxTokenAge
        }

        const response = NextResponse.json(
            {message: "Inicio de Sesión Exitoso"}, 
            {
                status: 200,
                headers: {"Content-Type": "application/json"}
            });
        // Set the auth token in cookies (not localStorage)
        response.cookies.set(cookieOptions);

        return response;
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}