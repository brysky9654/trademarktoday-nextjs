import { findByEmail } from "@/db/users";
import { Request, Response } from "express";
export default function handler(req: Request, res: Response) {
    const { email } = req.query;
    const emailAsString = email?.toString() ?? '';
    if (req.method === 'GET') {
        findByEmail({req, res},emailAsString);
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}