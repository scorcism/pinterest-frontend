export type loginType = {
  email: string;
  password: string;
};

export type registerType = {
  username: string;
  email: string;
  password: string;
};

export type forgotPasswordType = {
  email: string;
};

export type resendVerifyAccountMailType = {
  email: string;
};

type bodyObj = {
  password: string;
  cpassword: string;
};
export type resetPasswordType = {
  body: bodyObj;
  id: string | undefined;
  token: string | undefined;
};

export type googleAuthType = {
  code: string;
};

export type successType = {
  http_code: number;
  message: string;
  error_code: string;
  data: {};
  error: {};
};

export type errorType = {
  http_code: number;
  message: string;
  error_code: string;
  data: {};
  error: {};
};
