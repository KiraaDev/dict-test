export type UserRole = "admin" | "resident";

export  type CustomJwtPayload = {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  email?: string;

  role?: string;
  user_role?: UserRole;

  app_metadata?: {
    provider?: string;
    providers?: string[];
    user_role?: UserRole;
  };

  user_metadata?: Record<string, unknown>;
}