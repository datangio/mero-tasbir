import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwt as jwtConfig } from "../config";
import {
  AdminLoginResponse,
  AdminUpdateResponse,
  AdminSoftDeleteResponse,
  AdminHardDeleteResponse,
} from "../types";
import { AdminLoginData, AdminUpdateData } from "../middleware";

const login = asyncHandler(async (req: Request, res: Response) => {
  // Type-safe access to validated request body
  const { email, password }: AdminLoginData = req.body;

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

  // Generate JWT token
  const payload = {
    id: admin.id,
    email: admin.email,
    role: admin.role,
  };

  const options = {
    expiresIn: jwtConfig.expiresIn,
    issuer: jwtConfig.issuer,
    subject: admin.id,
  } as SignOptions;

  const token = jwt.sign(payload, jwtConfig.secret, options);

  const response: AdminLoginResponse = {
    message: "Login successful",
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  };

  res.json(response);
});

/**
 * Update admin profile
 * Updates admin information based on provided fields
 */
const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  // Type-safe access to validated request body and params
  const adminId = req.params.id;
  const updateData: AdminUpdateData = req.body;

  // Check if admin exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { id: adminId },
  });

  if (!existingAdmin) {
    res.status(404).json({ message: "Admin not found" });
    return;
  }

  // Prepare update data
  const dataToUpdate: AdminUpdateData = {};

  // Update email if provided
  if (updateData.email) {
    // Check if email is already taken by another admin
    const emailExists = await prisma.admin.findUnique({
      where: {
        email: updateData.email,
        NOT: { id: adminId }, // Exclude current admin
      },
    });

    if (emailExists) {
      res
        .status(400)
        .json({ message: "Email is already in use by another admin" });
      return;
    }

    dataToUpdate.email = updateData.email;
  }

  // Update password if provided (hash it)
  if (updateData.password) {
    const saltRounds = 12;
    dataToUpdate.password = await bcrypt.hash(updateData.password, saltRounds);
  }

  // Update other fields if provided
  if (updateData.name) dataToUpdate.name = updateData.name;
  if (updateData.role) dataToUpdate.role = updateData.role;
  if (updateData.avatar) dataToUpdate.avatar = updateData.avatar;
  if (typeof updateData.isActive === "boolean")
    dataToUpdate.isActive = updateData.isActive;

  // updatedAt is automatically handled by Prisma @updatedAt

  // Update admin in database
  const updatedAdmin = await prisma.admin.update({
    where: { id: adminId },
    data: dataToUpdate,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatar: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      // Exclude password from response
    },
  });

  const response: AdminUpdateResponse = {
    message: "Admin profile updated successfully",
    admin: updatedAdmin,
  };

  res.json(response);
});

/**
 * Delete admin account
 * Soft delete by setting isActive to false, or hard delete from database
 */
const deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
  // Type-safe access to validated request params
  const adminId = req.params.id;
  const { permanent } = req.query; // Optional query param for hard delete

  // Check if admin exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { id: adminId },
  });

  if (!existingAdmin) {
    res.status(404).json({ message: "Admin not found" });
    return;
  }

  // Prevent self-deletion (you could add JWT verification here to check current user)
  // For now, we'll just check if it's the only admin
  const adminCount = await prisma.admin.count({
    where: { isActive: true },
  });

  if (adminCount <= 1) {
    res.status(400).json({
      message:
        "Cannot delete the last active admin. At least one admin must remain active.",
    });
    return;
  }

  if (permanent === "true") {
    // Hard delete - permanently remove from database
    await prisma.admin.delete({
      where: { id: adminId },
    });

    const response: AdminHardDeleteResponse = {
      message: "Admin account permanently deleted",
      adminId: adminId,
    };

    res.json(response);
  } else {
    // Soft delete - set isActive to false
    const deactivatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: {
        isActive: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    const response: AdminSoftDeleteResponse = {
      message: "Admin account deactivated successfully",
      admin: deactivatedAdmin,
    };

    res.json(response);
  }
});

export { login, updateProfile, deleteAdmin };
