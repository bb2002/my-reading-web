export type HttpType = {
  code: number;
  message: string;
  detail?: string;
};

export const HttpTypeInitialState: HttpType = {
  code: -1,
  message: "",
};
