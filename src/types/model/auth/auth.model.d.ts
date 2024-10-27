declare interface RegisterModel {
  user_uuid: string;
  access_token: string;
}

declare type AuthError400 = {
  error: string;
};

declare interface AuthError403 {
  error: string;
  action: string;
}

declare interface AuthError422 {
  error: string;
  field: string;
  errors: Record<string, string[]>;
}

declare interface AuthError449 {
  confirm_id: string;
  confirm_method: 'main' | 'phone' | 'application';
  send_to: string;
  message: string;
  expired_at: string;
}

declare type AuthErrorResponse =
  | AuthError400
  | AuthError403
  | AuthError422
  | IResponse<AuthError449>;

declare interface LoginModel extends RegisterModel {}

declare interface LogoutModel {
  status: boolean;
}

declare interface RestoreModel extends LogoutModel {}

declare interface CheckUserModel extends LogoutModel {}

declare interface ITokens extends RegisterModel {}
