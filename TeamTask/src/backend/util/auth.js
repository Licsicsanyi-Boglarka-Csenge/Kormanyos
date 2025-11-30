import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export function auth(req, res, next) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  try {
    const token = accessToken.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = data.id;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized!" });
  }
}
