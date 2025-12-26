import { getCookie } from "./cookieCollection";

type CustomFetchProps = {
  endpoint: string;
  headers?: object;
  queries?: {
    [key: string]: string | number | boolean | null;
  } | null;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  responseType?: "json" | "blob";
  sendToken?: boolean;
};

type CallbackParams = {
  body?: any;
  params?: string[] | null;
  queryParam?: CustomFetchProps["queries"];
};

type Func_CallbackFunc = ({
  body,
  params,
  queryParam,
}: CallbackParams) => Promise<any>;

async function dataToJson(data: Response) {
  const json = await data.json();
  return json;
}

async function dataToBlob(data: Response) {
  const blob = await data.blob();
  return blob;
}

function objectToQuery(queries: CustomFetchProps["queries"] = {}) {
  const query = `?${Object.keys(queries || {})
    .map((key) => {
      return queries[key] ? `${key}=${queries[key]}` : null;
    })
    .filter((value) => (value ? value : false))
    .join("&")}`;
  return query;
}

export function customFetch({
  endpoint,
  method = "GET",
  headers,
  responseType = "json",
  queries,
  sendToken = true,
}: CustomFetchProps): Func_CallbackFunc {
  return async function ({ body, params, queryParam }: CallbackParams) {
    const joinParams = params ? `/${params?.join("/")}` : "";
    const joinQueris =
      queries || queryParam ? objectToQuery(queries || queryParam) : "";
    const jsonBody = body ? JSON.stringify(body) : null;
    const token = await getCookie("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}${endpoint}${joinParams}${joinQueris}`,
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
        const json = await dataToJson(res);
        return json;
      } else if (responseType === "blob") {
        const blob = await dataToBlob(res);
        return blob;
      }
    } else {
      const error = await dataToJson(res);
      throw error;
    }
  };
}
