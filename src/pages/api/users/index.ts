import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../server/dbConnect";
import User from "../../../../server/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    if (req.method === "GET") {
      //   await User.deleteMany({ username: /jar/ });
      const users = await User.find().exec();
      res.json(users);
    }
  } catch (err) {
    console.error(err);
  }
}
