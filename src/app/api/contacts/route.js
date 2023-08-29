import { connect } from "@/config/dbConfig";
import Contact from "@/models/ContactModel";
import {NextRequest, NextResponse} from "next/server"

// Connect to the database
connect();

/**
 * @param {NextRequest} req
 */
export async function GET(req) {
    const id = req.headers.get("X-USER-ID");

    try {
        const clients = await Contact.find().where("strimer").equals(id);
        return NextResponse.json(clients, {status: 200});
    } catch (error) {
        console.log(error);
    }
}

/**
 * @param {NextRequest} req 
 */

export async function POST(req) {
    const id = req.headers.get("X-USER-ID");
    const body = await req.json();
    const newContact = new Contact(body)
    newContact.strimer = id;

    try {
        const savedContact = await newContact.save();
        return NextResponse.json({message: "Contacto creado correctamente", savedContact}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 403})
    }
}