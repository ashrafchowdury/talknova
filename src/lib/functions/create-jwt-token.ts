import jwt from "jsonwebtoken";

export const createJwtToken = (_id: string) => {
  return jwt.sign({ _id }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: "3d",
  });
};
