import 'express';

export interface OrderItem {
  productId: string;
  quantity: string;
}

export type InventoryType = 'IN' | 'OUT' | 'ADJUSTMENT';

export interface JwtPayload {
  id: string;
  email: string;
}

export interface AuthCookies {
  accessToken?: string;
  refreshToken?: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    cookies: AuthCookies;
    user?: JwtPayload;
  }
}
