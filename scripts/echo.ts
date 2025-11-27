// Echo MCP Server - Tool Implementation
// @ts-nocheck
import type {
  PingInput,
  PingOutput,
  StatusInput,
  StatusOutput,
} from "./echo.d";

/**
 * Ping - Simple ping/pong response
 * Has both .in.yao and .out.yao for testing output schema
 */
function Ping(ctx: mcp.Context, input: PingInput): PingOutput {
  const { count = 1 } = input;

  return {
    message: "pong",
    count: count,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Status - Get system status
 * Only has .in.yao, returns status text
 */
function Status(ctx: mcp.Context, input: StatusInput): StatusOutput {
  const { verbose = false } = input;

  let status = "System Status: OK\n";

  if (verbose) {
    status += "\nDetails:\n";
    status += `- Server: Running\n`;
    status += `- Time: ${new Date().toISOString()}\n`;
    status += `- MCP Version: 2025-06-18\n`;
    status += `- Tools Available: 3\n`;
  }

  return status;
}
