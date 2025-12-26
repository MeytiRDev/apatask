import { getPureCookie } from "@/utils/clientCookiesCollection";
import { create } from "zustand";

type UseAuthSchema = {
  isLogin: boolean;
  setIsLogin: (payload: boolean) => void;
};

export const useAuth = create<UseAuthSchema>((set) => ({
  isLogin: Boolean(getPureCookie("token")),
  setIsLogin: (payload: boolean) => set(() => ({ isLogin: payload })),
}));
