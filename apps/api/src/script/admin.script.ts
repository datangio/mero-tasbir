import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.admin.create({
      data: {
        email: "admin@merotasbir.com",
        password: hashedPassword,
        name: "Admin",
      },
    });
    console.log("Admin created successfully:", admin);
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
