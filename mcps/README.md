# Yao MCP Servers

This directory contains MCP (Model Context Protocol) server definitions that expose Yao Processes as MCP tools.

## Overview

Yao MCP servers provide a bridge between the MCP protocol and Yao's process system, allowing AI assistants (like Claude) to interact with Yao applications through standardized tool interfaces.

## Architecture

```
MCP Client (AI Assistant)
    ↓ (MCP Protocol)
MCP Server Definition (*.mcp.yao)
    ↓ (Process Mapping)
Yao Process
    ├── Built-in Processes (models.*, flows.*, scripts.*, etc.)
    └── Custom Processes (scripts/*.ts, plugins, etc.)
```

**Key Concept**: MCP tools map directly to Yao Processes. Any Yao process can be exposed as an MCP tool, including:

- Built-in processes (`models.user.Find`, `flows.data.Process`, etc.)
- Custom TypeScript/JavaScript processes (`scripts.myapp.MyFunction`)
- Plugin processes
- Any other registered Yao process

## MCP Server Configuration

Yao exposes processes as MCP tools using the **Process Transport**.

```json
{
  "transport": "process",
  "endpoint": "/dsl", // Optional: Exposes as /v1/mcps/dsl for external MCP clients (HTTP/SSE)
  "tools": {
    "validate_model": "scripts.dsl.ValidateModel", // Custom process
    "find_user": "models.user.Find", // Built-in process
    "run_flow": "flows.data.Process" // Built-in process
  }
}
```

**Examples**: `echo.mcp.yao`, `dsl.mcp.yao`

**Configuration Options**:

- `transport`: Must be `"process"` for Yao MCP servers
- `label`: Human-readable name for the MCP server
- `description`: Description of what the server provides
- `endpoint` (optional): Exposes the server at `/v1/mcps/{endpoint}` for external MCP clients
  - Supports HTTP and SSE transport protocols
  - Example: `"endpoint": "/dsl"` → accessible at `/v1/mcps/dsl`
  - If not provided, the server is only accessible within Yao application
- `tools`: Map of MCP tool names to Yao process names
  - Can map to any Yao process: built-in, custom, or plugin processes

## File Structure

```
mcps/
├── README.md                    # This file
├── echo.mcp.yao                # Simple test MCP server
├── dsl.mcp.yao                 # DSL operations MCP server
└── tools/                      # Tool definitions and schemas
    ├── echo/
    │   ├── schemes/            # Required
    │   │   ├── ping.in.yao     # Input schema (required)
    │   │   ├── ping.out.yao    # Output schema (optional)
    │   │   └── ping.jsonl      # Sample data (optional)
    │   └── prompts/            # Optional
    │       └── test_connection.pmt.yao
    └── dsl/
        ├── schemes/            # Required
        │   ├── validate_model.in.yao
        │   ├── validate_model.out.yao
        │   └── validate_model.jsonl
        └── prompts/            # Optional
            ├── create_model.pmt.yao
            └── review_api.pmt.yao
```

## Creating an MCP Server

### Step 1: Define the MCP Server

Create a `*.mcp.yao` file:

```json
{
  "label": "My MCP Server",
  "description": "Description of what this server does",
  "transport": "process",
  "endpoint": "/my-server",
  "capabilities": {
    "tools": { "listChanged": false }
  },
  "tools": {
    "my_tool": "scripts.myserver.MyTool"
  }
}
```

### Step 2: Create Tool Schemas

Create schemas in `tools/{server_name}/schemes/`:

**`my_tool.in.yao`** (Required - Input Schema):

```json
{
  "type": "object",
  "description": "Tool description",
  "properties": {
    "param1": {
      "type": "string",
      "description": "Parameter description"
    }
  },
  "required": ["param1"]
}
```

**`my_tool.out.yao`** (Optional - Output Schema):

```json
{
  "type": "object",
  "properties": {
    "result": {
      "type": "string",
      "description": "Result description"
    }
  }
}
```

**`my_tool.jsonl`** (Optional - Sample Data):

```jsonl
{"name":"example1","description":"First example","input":{"param1":"value1"},"output":{"result":"output1"}}
{"name":"example2","description":"Second example","input":{"param1":"value2"},"output":{"result":"output2"}}
```

### Step 3: Implement the Process

You have several options:

#### Option A: Use Built-in Yao Processes

Map directly to existing Yao processes:

```json
{
  "tools": {
    "find_user": "models.user.Find",
    "create_pet": "models.pet.Create",
    "process_data": "flows.data.Transform"
  }
}
```

No additional implementation needed!

#### Option B: Create Custom TypeScript Processes

Create TypeScript types in `scripts/myserver.d.ts`:

```typescript
export declare type MyToolInput = {
  param1: string;
};

export declare type MyToolOutput = {
  result: string;
};
```

Implement in `scripts/myserver.ts`:

```typescript
import type { MyToolInput, MyToolOutput } from "./myserver.d";

function MyTool(ctx: mcp.Context, input: MyToolInput): MyToolOutput {
  // Implementation
  return {
    result: `Processed: ${input.param1}`,
  };
}
```

#### Option C: Use Plugin Processes

Map to processes from Yao plugins:

```json
{
  "tools": {
    "analyze_image": "plugins.vision.Analyze",
    "generate_pdf": "plugins.pdf.Generate"
  }
}
```

## Convention-Based Loading

MCP servers automatically scan and load:

### Tools

- Scans `tools/{server_name}/schemes/*.in.yao`
- Tool name = filename (without `.in.yao`)
- Maps to process defined in `*.mcp.yao`

### Prompts (Optional)

- Scans `tools/{server_name}/prompts/*.pmt.yao`
- Prompt name = filename (without `.pmt.yao`)
- Automatically exposed via MCP's `ListPrompts`
- If no prompts directory exists, server will have no prompts

### Samples

- Loads `tools/{server_name}/schemes/*.jsonl`
- Provides examples for AI assistants
- Format: one JSON object per line (JSONL)

## File Naming Conventions

| Extension  | Purpose                    | Required | Example                |
| ---------- | -------------------------- | -------- | ---------------------- |
| `.in.yao`  | Input schema (JSON Schema) | ✅ Yes   | `ping.in.yao`          |
| `.out.yao` | Output schema (optional)   | ⭕ No    | `ping.out.yao`         |
| `.jsonl`   | Sample data (JSONL format) | ⭕ No    | `ping.jsonl`           |
| `.pmt.yao` | Prompt template            | ⭕ No    | `create_model.pmt.yao` |

## Example Servers

### Echo Server (`echo.mcp.yao`)

Simple testing server with basic tools:

- **ping** - Echo with count and timestamp
- **status** - System status report

### DSL Server (`dsl.mcp.yao`)

Yao DSL operations:

- **validate_model** - Validate Yao Model DSL
- **format_flow** - Format Yao Flow DSL
- **analyze_api** - Analyze Yao API DSL

## Environment Variables

You can use environment variables in MCP definitions:

```json
{
  "url": "$ENV.MCP_SERVER_URL",
  "authorization_token": "$ENV.MCP_TOKEN",
  "env": {
    "API_KEY": "$ENV.MY_API_KEY"
  }
}
```

## Testing

To test an MCP server:

1. Start your Yao application
2. Connect an MCP client (e.g., Claude Desktop)
3. Use the tools exposed by the server

## Best Practices

1. **Reuse Existing Processes**: Leverage built-in Yao processes (`models.*`, `flows.*`) when possible
2. **Clear Descriptions**: Provide detailed descriptions for tools and parameters in schemas
3. **Type Safety**: Define TypeScript types for custom processes
4. **Sample Data**: Include `.jsonl` files with realistic examples to help AI understand usage
5. **Error Handling**: Handle errors gracefully in your process implementations
6. **Documentation**: Add comments to explain complex tools and parameters
7. **Naming Consistency**: Use clear, descriptive names that match the process functionality

## Learn More

- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Yao Process Documentation](https://yaoapps.com/docs)
- [JSON Schema Reference](https://json-schema.org/)
