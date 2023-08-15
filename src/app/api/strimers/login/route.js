import {connect} from "@/config/dbConfig";
import Strimer from "@/models/StrimerModel";
import jwt from "jsonwebtoken";

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

        // Authenticate
        const tokenData = {
            id: authStrimer._id,
            user,
            email: authStrimer.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "7d"});

        const response = NextResponse.json({message: "Inicio de Sesión Exitoso"}, {status: 200});
        // Set the auth token in cookies (not localStorage)
        response.cookies.set("token", token, {httpOnly: true});

        return response;
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}