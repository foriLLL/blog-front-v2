import ArticleInfo from "@/types/ArticleInfo";
import ResBody from "@/types/ResBody";
import axios, { AxiosResponse } from "axios";
import { baseURL } from "./config";

export const getAllArticleInfos:(()=>Promise<ArticleInfo[]>) = async () => {
  const res:AxiosResponse<ResBody<ArticleInfo[]>> = await axios.get(baseURL+"/api/articleInfo");
  if(res.data && res.data.ifSuccessful){
    return res.data.data;
  }else{
    return [];
  }
}