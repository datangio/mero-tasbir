import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import asyncHandler from "../utils/asyncHandler";

const prisma = new PrismaClient();

export const createOrUpdateUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, name, provider } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Email and name are required",
      });
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { email },
        data: {
          fullName: name,
          username: email.split('@')[0],
          userType: 'user', // Default to 'user' type
        },
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          fullName: name,
          username: email.split('@')[0],
          address: 'Not provided',
          password: 'oauth-user', // Placeholder password for OAuth users
          userType: 'user',
          isEmailVerified: true, // OAuth users are considered verified
        },
      });
    }

    res.json({
      success: true,
      message: "User created/updated successfully",
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        userType: user.userType,
      },
    });
  } catch (error: any) {
    console.error('Create/update user error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        userType: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

