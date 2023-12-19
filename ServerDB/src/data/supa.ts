import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";

const supabaseUrl = "https://xuqrfjhcdecxedzbxcza.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1cXJmamhjZGVjeGVkemJ4Y3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5NDQ1NDksImV4cCI6MjAxODUyMDU0OX0.FF91hbkB7tEoshs9pbXXGtJK6xmxWc0EceJeC3yVr24";
export const supabase: any = createClient(supabaseUrl, supabaseKey);

export const upLoadeIMG = async (file: any) => {
  const fileName = "images/" + uuid() + ".jpg"  ;
  const { error } = await supabase.storage
    .from("aaaaa")
    .upload(fileName, file, { cacheControl: "image/jpg"});
  if (error) {
    throw error;
  }
  const { data } = await supabase.storage.from("aaaa").getPublicUrl(fileName);
  return data.publicUrl;
};


export const upLoadePDF = async (file: any) => {
  const fileName = "pdf/" + uuid() + ".pdf"  ;
  const { error } = await supabase.storage
    .from("aaaa")
    .upload(fileName, file, { cacheControl: "application/pdf"});
  if (error) {
    throw error;
  }
  const { data } = await supabase.storage.from("aaaa").getPublicUrl(fileName);
  return data.publicUrl;
};

export const upLoadeVideo = async (file: any) => {
    const fileName = "mp4/" + uuid() + ".mp4"  ;
    const { error } = await supabase.storage
      .from("aaaa")
      .upload(fileName, file, { cacheControl: "video/mp4"});
    if (error) {
      throw error;
    }
    const { data } = await supabase.storage.from("aaaa").getPublicUrl(fileName);
    return data.publicUrl;
  };