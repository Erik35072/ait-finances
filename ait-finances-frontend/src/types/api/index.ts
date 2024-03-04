export type ResponseModel<T = unknown> = {
  data?: T;
  error?: {
    message: string;
    code: number;
  };
  errors?: { [key: string]: unknown[] };
};

export type RequestOptions = null | {
  auth?: boolean;
  headers?: Record<string, unknown>;
};
