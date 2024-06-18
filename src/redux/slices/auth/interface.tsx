export declare interface AuthState {
  token: any;
  isLogged: boolean;
  isAdmin: boolean;
  isRegFetching: boolean;
  isLoginFetching: boolean;
}

export declare interface FetchAuthInterface {
  data?: { [key: string]: string | number | object | null | boolean };
  params?: { [key: string]: string | number | object | null };
}
