import { NextApiRequest, NextApiResponse } from "next";

export default function login(
    req: NextApiRequest,
    res: NextApiResponse<any>,
  ) {
    if(req.method == 'POST'){
        res.status(200).json({ name: "John Doe" });
    }else{
        res.status(405).json({ message: "Method not allowed" });
    }
  }
  