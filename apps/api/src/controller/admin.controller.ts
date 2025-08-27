import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // Compare password with hashed password
  if (!(await bcrypt.compare(password, admin.password))) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // TODO: Generate JWT token
  res.json({
    message: "Login successful",
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  });
});

export { login };
