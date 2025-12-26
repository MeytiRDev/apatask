"use server";
import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  const cookie = await cookies();
  const result = cookie.set(key, value);
  return result;
}

export async function getCookie(key: string) {
  const cookie = await cookies();
  const value = cookie.get(key)?.value;
  return value;
}


