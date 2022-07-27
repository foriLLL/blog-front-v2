import Article from "@/types/Article";
import ResBody from "@/types/ResBody";
import axios, { AxiosResponse } from "axios";
import { baseURL } from "./config";

export const getArticleById:((articleId: number)=>Promise<Article|undefined>) = async (articleId) => {
  const res:AxiosResponse<ResBody<Article>> = await axios.get(baseURL+`/api/article/${articleId}`);
  if(res.data && res.data.ifSuccessful){
    return res.data.data;
  }else{
    return undefined;
  }
}
