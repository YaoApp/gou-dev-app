export declare function SendMessage(
  message: string | agent.OutputMessage
): void;

export declare function Run(
  assistant_id: string,
  input: string,
  /**
   * The callback function name, process name or the function name in the same TS file
   */
  callback?: string | { name: string; args?: any[] },
  /**
   * The options
   */
  options?: Record<string, any>
): void;

export declare namespace agent {
  export type Init =
    | {
        assistant_id?: string;
        chat_id?: string;
        next?: NextAction;
        input?: Input;
        options?: Options;
      }
    | string
    | null
    | void;

  export type Done =
    | { next?: NextAction; input?: Input; output?: string }
    | string
    | null
    | void;

  export type Fail =
    | { next?: NextAction; input?: Input; output?: string; error?: string }
    | string
    | null
    | void;

  export type ResponseWriter = object;

  export type NextAction = {
    action: "assistant";
    payload?: Record<string, any>;
  };

  /**
   * Represents the context of an operation or request.
   */
  export interface Context {
    /** Session ID, optional. */
    sid?: string;
    /** Assistant ID, optional. */
    assistant_id?: string;
    /** Chat ID, optional. */
    chat_id?: string;
    /** The current path of the operation. */
    pathname: string;
    /** Stack trace or operation stack. */
    stack: string;
    /** The namespace where the operation is executed. */
    namespace: string;
    /** Form data associated with the context. */
    formdata: Record<string, any>;
    /** Configuration settings for the context. */
    config: Record<string, any>;
    /** The current field being processed. */
    field: Field;
    /** Signal data for triggering or handling events. */
    signal: any;
    /** RAG support */
    rag: boolean;
    /** Version support */
    version: boolean;
  }

  export type Options = Record<string, any>;

  /**
   * Represents a field in a form or data structure.
   */
  export interface Field {
    /** The binding key for the field. */
    bind: string;
    /** The value associated with the field. */
    value: any;
  }

  export interface InputMessage {
    /** The ID of the message */
    id?: string;

    /** The ID of the assistant */
    assistant_id?: string;

    /** The name of the assistant */
    assistant_name?: string;

    /** The name of the message */
    name?: string;

    /** The role of the message */
    role: "user" | "assistant" | "system";

    /** The text content of the message */
    text?: string;

    /** The type of the message */
    type?: string;

    /** Whether the message is hidden */
    hidden?: boolean;

    /** The props of the message */
    props?: Record<string, any>;

    /** The actions of the message */
    attachments?: Attachment[];
  }

  export interface OutputMessage {
    /** The ID of the message */
    id?: string;

    /** The name of the message */
    name?: string;

    /** The ID of the assistant this message belongs to */
    assistant_id?: string;

    /** The name of the assistant */
    assistant_name?: string;

    /** The avatar of the assistant */
    assistant_avatar?: string;

    /** Whether the message is new */
    new?: boolean;

    /** Whether the completion is done */
    done?: boolean;

    /** The text content of the message */
    text?: string;

    /** The type of the message */
    type?: string;

    /** The props of the message */
    props?: Record<string, any>;

    /** The actions of the message */
    actions?: Action[];

    /** The attachments of the message */
    attachments?: Attachment[];

    /** The delta of the message */
    delta?: boolean;
  }

  export type Output = OutputMessage[] | undefined | null;
  export type Input = InputMessage[];

  export interface Data {
    type: string;
    id?: string;
    function?: string;
    text?: string;
    arguments?: any;
  }

  /**
   * Represents a file attachment with its metadata.
   */
  export interface Attachment {
    /** Name of the attachment */
    name?: string;
    /** URL to access the attachment */
    url?: string;
    /** Type of the attachment */
    type?: string;
    /** MIME type of the attachment */
    content_type?: string;
    /** Size of the attachment in bytes */
    bytes?: number;
    /** Timestamp of when the attachment was created */
    created_at?: number;
    /** Unique identifier for the file */
    file_id?: string;
    /** ID of the chat this attachment belongs to */
    chat_id?: string;
    /** ID of the assistant this attachment is associated with */
    assistant_id?: string;
  }

  /**
   * Represents an action to be performed by the system.
   */
  export interface Action {
    /** Name of the action */
    name?: string;
    /** Type of the action to be performed */
    type: string;
    /** Additional data required for the action */
    payload?: any;
  }
}
