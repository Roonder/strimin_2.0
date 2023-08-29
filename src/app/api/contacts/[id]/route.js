import { connect } from "@/config/dbConfig";
import Contact from "@/models/ContactModel";
import {NextRequest, NextResponse, URLPattern} from "next/server"

// Connect to the database
connect();

/**
 * @param {NextRequest} req
 * @param {URLPattern} url
 */
export async function GET(req, url) {
    const id = req.headers.get("X-USER-ID");
    const contactId = url?.params?.id;
    const body = await req.json();
    let contact;
    try {
        contact = await Contact.findById(contactId);
        return NextResponse.json(contact);
    } catch (error) {
        return NextResponse.json({message: "ID de Usuario Inválido"}, {status: 403});
    }
}

/**
 * @param {NextRequest} req
 * @param {URLPattern} url
 */
export async function PUT(req, url) {
    const id = req.headers.get("X-USER-ID");
    const contactId = url?.params?.id;
    const body = await req.json();
    let contact;
    try {
        contact = await Contact.findById(contactId);
    } catch (error) {
        return NextResponse.json({message: "ID de Usuario Inválido"}, {status: 403});
    }

    // Updating data
    contact.name = body.name || contact.name;
    contact.phone = body.phone || contact.phone;

    try {
        const updatedContact = await contact.save();
        return NextResponse.json({message: "Contacto actualizado correctamente", updatedContact}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 403})
    }
}

/**
 * @param {NextRequest} req
 * @param {URLPattern} url
 */
export async function DELETE(req, url) {
    const id = req.headers.get("X-USER-ID");
    const contactId = url?.params?.id;
    let contact;
    try {
        contact = await Contact.findById(contactId);
    } catch (error) {
        return NextResponse.json({message: "ID de Usuario Inválido"}, {status: 403});
    }

    try {
        await contact.deleteOne();
        return NextResponse.json({message: "Contacto eliminado correctamente"}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 403})
    }
}