
import { Request, Response } from "express";
export default function handler(req: Request, res: Response) {
    res.clearCookie('token').redirect('/')
}