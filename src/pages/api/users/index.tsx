import { Request, Response } from "express";
import { find, insert, remove, update } from "@/db/users";
export default function handler(req:Request, res:Response) {
  if (req.method === 'GET') {
    find(req,res);
  } else if (req.method === 'POST') {
    insert(req,res);
  } else if (req.method === 'PUT') {
    update(req,res);
  } else if (req.method === 'DELETE') {
    remove(req,res);
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}