import { ResponseValue } from "./scheme";

const BASE_URL = "https://omdbapi.com";
const APIKEY = "8488a957";

export const fetchKeyword = async (keyword: string): Promise<ResponseValue> => {
  const response: Response = await fetch(
    `${BASE_URL}?apikey=${APIKEY}&s=${keyword}&page=1`
  );
  const data: ResponseValue = await response.json();
  return data;
};

export const fetchNextPage = async (
  keyword: string,
  page: number
): Promise<ResponseValue> => {
  const response: Response = await fetch(
    `${BASE_URL}?apikey=${APIKEY}&s=${keyword}&page=${page}`
  );
  const data: ResponseValue = await response.json();
  return data;
};
