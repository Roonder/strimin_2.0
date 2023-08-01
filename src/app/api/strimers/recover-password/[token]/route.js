import {connect} from "@/config/dbConfig";
import Strimer from "@/models/StrimerModel";
// Next Tools
import { NextResponse } from "next/server";

// Connect to the database
connect()

//Login an Strimer
export async function GET(req) {
    try {
        const {token} = req.nextUrl.searchParams;
    
        const userToken = await Strimer.findOne({token});
        
        if(!userToken) return NextResponse.json({error: "Hubo un error con su token"}, {status: 404})
    
        return NextResponse.json({message: "Usuario confirmado, inserte su nuevo password"}); 
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function POST(req) {
    try {
        const {token} = req.nextUrl.searchParams;
        const {password} = req.json();
    
        const user = await Strimer.findOne({token});
    
        if(!user) return NextResponse.json({error: "Hubo un error con su token"}, {status: 404});

        // User confirmed, updating password
        user.token = null;
        user.password = password;
        await user.save();

        return NextResponse.json({message: "Password actualizado correctamente"}, {status: 200});
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}