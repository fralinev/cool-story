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

      const found = await User.findOne({ username }).exec();

      if (!found) return res.json({ message: `User ${username} not found` });

      if (found) {
        const match = password === found.password;
        if (match) return res.json({ message: "OK", user: found });
        else return res.json({ message: "wrong password" });
      }
    }
  } catch (err) {
    console.error(err);
  }
}
