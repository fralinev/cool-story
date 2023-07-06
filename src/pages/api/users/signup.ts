import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../server/dbConnect";
import User from "../../../../server/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const { username, password } = req.body;

      const duplicate = await User.findOne({ username }).exec();
      if (duplicate)
        return res.json({ message: `User ${username} already exists.` });

      await User.create({
        username,
        password,
      });

      res.status(200).json({
        message: "OK",
      });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
