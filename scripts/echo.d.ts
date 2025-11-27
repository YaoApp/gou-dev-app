// Echo MCP Server - Tool Types

export declare type PingInput = {
  count?: number;
};

export declare type PingOutput = {
  message: string;
  count: number;
  timestamp: string;
};

export declare type StatusInput = {
  verbose?: boolean;
};

export declare type StatusOutput = string; // Status report text
