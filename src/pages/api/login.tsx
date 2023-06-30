import db from "@/db/db";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { AuthStatus } from "@/types/interface";
import { Request, Response } from "express";
import { JWT_SIGN_KEY } from "@/types/utils";
export default function handler(req: Request, res: Response) {
    let authStatus: AuthStatus = "NONE";
    const { email, password } = req.body;
    if (req.method === 'POST') {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results, fields) => {
            if (err) throw err
            console.log(results)
            if (results.length === 0) {
                authStatus = "UNREGISTER_USER"
            } else {
                const hashedPassword = results[0].password;
                const match = await bcrypt.compare(password, results[0].password);
                if (match) {
                    authStatus = "PASSED";
                    const { name, given_name, family_name, picture } = results[0]
                    const token = jwt.sign({ email, name, given_name, family_name, picture }, JWT_SIGN_KEY);
                    res.setHeader(
                        "Set-Cookie",
                        `token=${token};  Path=/; Max-Age=${60 * 60//HttpOnly;SameSite=Strict; 
                        }`
                    )
                } else {
                    authStatus = "INVALID_PASSWORD"
                }
            }
            res.status(200).json({ authStatus })
        })
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}