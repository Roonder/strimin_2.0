import {connect} from "@/config/dbConfig";
import Strimer from "@/models/StrimerModel";
import generateId from "@/helpers/generateId";
import recoverPasswordEmail from "@/helpers/recoverPasswordMail";
// Next Tools
import { NextResponse } from "next/server";

// Connect to the database
connect()

//Login an Strimer
export async function POST(req) {
    try {
        const body = await req.json();
        const {email} = body;

        const recoverUser = await Strimer.findOne({email});
        // Check if user to recover exists
        if(!recoverUser) return NextResponse.json({error: "Usuario no encontrado"}, {status: 400});

        // Generate the token for renew the password
        recoverUser.token = generateId();
        const updatedUser = await recoverUser.save();

        // Generate the recovery email
        recoverPasswordEmail({
            email,
            user: updatedUser.user,
            token: updatedUser.token
        });

        return NextResponse.json({message: "Proceso de recuperación en progreso.."}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}