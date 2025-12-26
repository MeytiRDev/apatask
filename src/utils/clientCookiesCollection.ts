"use client";
export async function setPureCookie(key: string, value: string) {
  document.cookie = `${key}=${value}; max-age=2592000`;
}

export async function getPureCookie(key: string) {
  const cookie = document.cookie;
  const isToken = cookie.split("; ").some((row) => row.startsWith(key + "="));
  return isToken;
}
