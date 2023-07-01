import { Request, Response } from "express";
import productsModel from '@/models/productsModel'
import source from './source.json'
export default async function handler(req: Request, res: Response) {
    try {
        // const user = await productsModel.create(source);
        res.status(201).json("user")
    } catch (error) {
        console.log("API error", error);
        if (!res.headersSent) {
            res.send(500).json({
                success: false,
                data: "Server error",
            });
        }
    }
}