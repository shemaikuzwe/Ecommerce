import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { appWrite } from "./appwrite/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const currencyFormater = new Intl.NumberFormat("en-rw", {
  style: "currency",
  currency: "RWF",
});

export const createFileUrl = (bucketFileId: string) => {
  return `${appWrite.API_ENDPOINT}/storage/buckets/${appWrite.BUCKET_ID}/files/${bucketFileId}/view?project=${appWrite.PROJECT_ID}`;
};

export const getFileId=(url:string)=>{
  const fileId = url.split('/files/')[1].split('/')[0];
  return fileId;
}