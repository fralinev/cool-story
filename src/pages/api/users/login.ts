import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB, getDB, closeDB } from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const db = getDB();
    const collection = db.collection("users");

    if (req.method === "POST") {
      const { username, password } = req.body;
      console.log(req.body);
      const found = await collection.findOne({ username });
      if (found) {
        const match = password === found.password;
        if (match) {
          res.json({ message: "OK", user: found });
        } else {
          res.json({ message: "wrong password" });
        }
      } else {
        res.json({ message: `user ${username} not found` });
      }
      return;
    }
  } catch (err) {
    console.error(err);
  } finally {
    closeDB();
  }
}
