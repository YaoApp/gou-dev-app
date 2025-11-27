// Yao DSL Operation Types

// Model Validation
export declare type ModelColumn = {
  name: string;
  type: string;
  label?: string;
  nullable?: boolean;
  primary?: boolean;
};

export declare type ModelDSL = {
  name: string;
  table: {
    name: string;
    comment?: string;
  };
  columns: ModelColumn[];
  indexes?: any[];
  relations?: any;
};

export declare type ValidateModelInput = {
  model: ModelDSL;
};

export declare type ValidationError = {
  field: string;
  message: string;
  severity: "error" | "warning";
};

export declare type ValidateModelOutput = {
  valid: boolean;
  errors: ValidationError[];
  warnings?: Array<{ field: string; message: string }>;
  stats?: {
    column_count: number;
    has_primary_key: boolean;
    has_timestamps: boolean;
  };
};

// Flow Formatting
export declare type FlowNode = {
  name: string;
  process: string;
  args?: any[];
};

export declare type FlowDSL = {
  name: string;
  nodes: FlowNode[];
};

export declare type FormatFlowInput = {
  flow: FlowDSL;
  indent?: number;
};

export declare type FormatFlowOutput = string; // Formatted JSON string

// API Analysis
export declare type APIPath = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  guard?: string;
  process?: string;
};

export declare type APIDSL = {
  name: string;
  version?: string;
  paths: APIPath[];
};

export declare type AnalyzeAPIInput = {
  api: APIDSL;
};

export declare type AnalyzeAPIOutput = string; // Analysis report as text

