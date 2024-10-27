'use client';

import Cookies from 'js-cookie';
import { COOKIE_NAME } from '../helpers/constants';

export const getToken = (): ITokens | undefined => {
  const tokenData = Cookies.get(COOKIE_NAME);

  if (!tokenData) return;

  return JSON.parse(tokenData);
};

export const setToken = (tokens: ITokens, expires?: number | Date | undefined) => {
  Cookies.set(COOKIE_NAME, JSON.stringify(tokens), { expires });
};

export const clearToken = () => {
  Cookies.remove(COOKIE_NAME);
};
