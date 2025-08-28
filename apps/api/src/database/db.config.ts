import prisma from "../lib/prisma";

/**
 * Database connection utilities
 * Prisma handles the actual connection management automatically
 */

/**
 * Test database connection
 * @returns Promise<boolean> - true if connection successful
 */
export const dbConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
};

/**
 * Get database connection status
 * @returns Promise<{ connected: boolean; message: string }>
 */
export const getConnectionStatus = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      connected: true,
      message: "Database connected successfully",
    };
  } catch (error) {
    return {
      connected: false,
      message: `Database connection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

/**
 * Close database connection (useful for scripts or graceful shutdown)
 */
export const closeConnection = async (): Promise<void> => {
  await prisma.$disconnect();
};

export default {
  dbConnection,
  getConnectionStatus,
  closeConnection,
};
