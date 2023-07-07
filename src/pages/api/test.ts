import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../server/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    if (req.method === "GET") {
      console.log("GETTING");
      res.json({ message: "GOT" });
    }
  } catch (err) {
    console.error(err);
  }
}
