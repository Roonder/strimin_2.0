import {connect} from "@/config/dbConfig";
import Strimer from "@/models/StrimerModel";
// Next Tools
import { NextResponse } from "next/server";

// Connect to the database
connect()

//Add an Strimer
export async function POST(req) {
    try {
        const body = await req.json();
        const {email, user, password} = body;

        // Check if strimer already exists
        const isStrimer = await Strimer.findOne({email});
        if(isStrimer) return NextResponse.json({error: "El usuario ya existe"}, {status: 400})

        // Create the new Strimer, save it and send it
        const newStrimer = new Strimer({email, user, password});

        await newStrimer.save();

        return NextResponse.json({
            message: "Usuario creado correctamente",
        }, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}