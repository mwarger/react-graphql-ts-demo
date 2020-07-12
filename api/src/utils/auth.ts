import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createToken = (userInfo: { id: string; email: string }) =>
  JWT.sign(
    { sub: userInfo.id, email: userInfo.email },
    process.env.SECRET || ""
  );

const verifyPassword = (attemptedPw: string, hashedPw: string) =>
  bcrypt.compareSync(attemptedPw, hashedPw);

const hashPassword = (password: string) => bcrypt.hashSync(password);

const verifyToken = (token: string) =>
  JWT.verify(token, process.env.SECRET || "");

export { createToken, verifyPassword, hashPassword, verifyToken };
