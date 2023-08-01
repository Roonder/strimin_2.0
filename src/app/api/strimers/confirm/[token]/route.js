import {connect} from "@/config/dbConfig";
import Strimer from "@/models/StrimerModel";
// Next Tools
import { NextResponse } from "next/server";

// Connect to the database
connect();

export async function GET(req) {
    try {
        const {token} = req.nextUrl.searchParams;
        const userToConfirm = await Strimer.findOne({token});

        if(!userToConfirm) return NextResponse.json({error: "Token inválido"}, {status: 400});

        // Confirm user
        userToConfirm.token = null;
        userToConfirm.confirmed = true;
        await userToConfirm.save();

        return NextResponse.json({message: "Usuario confirmado correctamente"}, {status: 200});
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}