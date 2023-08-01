import { connect } from "@/config/dbConfig";
import Strimer from "@/models/StrimerModel";
import { getJwtData } from "@/helpers/getJwtData";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

/**
 * @param {NextRequest} req 
 */

export async function GET(req){
    try {
        const strimerId = await getJwtData(req);
        const strimer = await Strimer.findOne({_id: strimerId}).select('-password -token -confirmed -__v');
        return NextResponse.json({
            message: "User found",
            strimer
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}