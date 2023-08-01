import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

/**
 * @param {NextRequest} req
 */

export const getJwtData = (req) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decoded_token = jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded_token.id;
    } catch (error) {
        throw new Error(error.message);
    }
}