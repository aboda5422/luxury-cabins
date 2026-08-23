export type GoogleIndexResult = {
  url: string;
  ok: boolean;
  status?: number;
  message?: string;
};

export type GoogleIndexResponse = {
  ok: boolean;
  submitted: number;
  succeeded: number;
  failed: number;
  results: GoogleIndexResult[];
  error?: string;
};
