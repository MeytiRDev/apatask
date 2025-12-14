import { getCookie } from "./cookieCollection";

type CustomFetchProps = {
  endpoint: string;
  headers?: object;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  responseType?: "json" | "blob";
  sendToken?: boolean;
  sendError?: boolean;
};

type CallbackParams = {
  body?: any;
  params?: string[] | null;
};

export function customFetch({
  endpoint,
  method = "GET",
  headers,
  responseType = "json",
  sendToken = true,
  sendError = false,
}: CustomFetchProps): any {
  return async ({ body, params }: CallbackParams) => {
    const joinParams = params ? `/${params?.join("/")}` : "";
    const jsonBody = body ? JSON.stringify(body) : null;
    const token = await getCookie("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}${endpoint}${joinParams}`,
      {
        method,
        body: jsonBody,
        headers: {
          "Content-Type": "application/json",
          Authorization: sendToken ? `Bearer ${token}` : "",
          ...headers,
        },
      }
    );
    if (res.ok) {
      if (responseType === "json") {
        const json = await res.json();
        return json;
      } else {
        const blob = await res.blob();
        return blob;
      }
    } else if (sendError) {
      const json = await res.json();
      return json;
    }
    return null
  };
}
