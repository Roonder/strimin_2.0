import {connect} from "@/config/dbConfig";
import Strimer from "@/models/StrimerModel";
// Next Tools
import { NextRequest, NextResponse, URLPattern } from "next/server";

// Connect to the database
connect()

/**
 * @param {NextRequest} req 
 * @param {URLPattern} url
 */
//Verify an Strimer
export async function GET(req, url) {
    try {
        const token = url?.params?.token;
        console.log(token)
    
        const userToken = await Strimer.findOne({token});
        
        if(!userToken) return NextResponse.json({error: "Hubo un error con su token"}, {status: 404})
    
        return NextResponse.json({message: "Usuario confirmado, inserte su nuevo password"}); 
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

/**
 * 
 * @param {URLPattern} url
 */
export async function POST(req, url) {
    try {
        const token = url?.params?.token;
        const body = await req.json();
        const {password} = body;
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