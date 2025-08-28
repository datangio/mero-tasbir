import httpServer from "./app";
import { config } from "./config";
import { dbConnection } from "./database/db.config";

/**
 * Start the HTTP server
 * Listens on the configured host and port from environment variables
 */
const startServer = async () => {
  httpServer.listen(config.server.port, config.server.host, () => {
    console.log(
      `Server running on ${config.server.host}:${config.server.port}`
    );
    console.log(`Environment: ${config.server.env}`);
    console.log(
      `Health check: http://${config.server.host}:${config.server.port}/api/v1/health`
    );
  });
};

dbConnection()
  .then(() => {
    startServer();
  })
  .catch(err => {
    console.log("Database connection failed", err);
  });
