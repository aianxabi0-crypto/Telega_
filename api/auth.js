import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

let users = [];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password, type } = req.body;

  if (type === "register") {
    const hash = await bcrypt.hash(password, 10);
    users.push({ username, password: hash });
    return res.json({ ok: true });
  }

  if (type === "login") {
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ error: "no user" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "wrong pass" });

    const token = jwt.sign({ username }, "SECRET");
    return res.json({ token });
  }
}
