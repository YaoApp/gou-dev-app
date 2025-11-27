// Yao DSL Operations - MCP Tool Implementation
// @ts-nocheck
import type {
  ValidateModelInput,
  ValidateModelOutput,
  FormatFlowInput,
  FormatFlowOutput,
  AnalyzeAPIInput,
  AnalyzeAPIOutput,
} from "./dsl.d";

/**
 * Validate a Yao Model DSL
 * This tool has both .in.yao and .out.yao schemas for testing
 */
function ValidateModel(
  ctx: mcp.Context,
  input: ValidateModelInput
): ValidateModelOutput {
  const { model } = input;
  const errors: any[] = [];
  const warnings: any[] = [];

  // Validate model name
  if (!model.name || model.name.length === 0) {
    errors.push({
      field: "name",
      message: "Model name is required",
      severity: "error",
    });
  }

  // Check for primary key
  let hasPrimaryKey = false;
  model.columns.forEach((col, idx) => {
    if (col.primary) {
      hasPrimaryKey = true;
    }
    // Validate column name
    if (!col.name) {
      errors.push({
        field: `columns[${idx}].name`,
        message: "Column name is required",
        severity: "error",
      });
    }
  });

  // Warning if no primary key
  if (!hasPrimaryKey) {
    warnings.push({
      field: "columns",
      message: "No primary key defined, consider adding one",
    });
  }

  // Check for timestamps
  const hasTimestamps =
    model.columns.some((c) => c.name === "created_at") &&
    model.columns.some((c) => c.name === "updated_at");

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      column_count: model.columns.length,
      has_primary_key: hasPrimaryKey,
      has_timestamps: hasTimestamps,
    },
  };
}

/**
 * Format a Yao Flow DSL
 * Only has .in.yao schema, output is simple string
 */
function FormatFlow(
  ctx: mcp.Context,
  input: FormatFlowInput
): FormatFlowOutput {
  const { flow, indent = 2 } = input;

  // Format the flow DSL as pretty-printed JSON
  const formatted = JSON.stringify(flow, null, indent);

  return formatted;
}

/**
 * Analyze a Yao API DSL
 * Only has .in.yao schema, output is analysis text
 */
function AnalyzeAPI(
  ctx: mcp.Context,
  input: AnalyzeAPIInput
): AnalyzeAPIOutput {
  const { api } = input;

  let report = `API Analysis Report\n`;
  report += `===================\n\n`;
  report += `Name: ${api.name}\n`;
  report += `Version: ${api.version || "not specified"}\n`;
  report += `Total Paths: ${api.paths.length}\n\n`;

  // Method statistics
  const methodStats: Record<string, number> = {};
  api.paths.forEach((p) => {
    methodStats[p.method] = (methodStats[p.method] || 0) + 1;
  });

  report += `Method Distribution:\n`;
  Object.entries(methodStats).forEach(([method, count]) => {
    report += `  ${method}: ${count}\n`;
  });

  // Security analysis
  const unguardedPaths = api.paths.filter((p) => !p.guard);
  if (unguardedPaths.length > 0) {
    report += `\n⚠️  Warning: ${unguardedPaths.length} path(s) without guards:\n`;
    unguardedPaths.forEach((p) => {
      report += `  - ${p.method} ${p.path}\n`;
    });
  }

  return report;
}

