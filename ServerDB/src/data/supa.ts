import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";


const supabaseUrl = "https://fxttvzupnaarxqpbfdhr.supabase.co/";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dHR2enVwbmFhcnhxcGJmZGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NDQzMDAsImV4cCI6MjAxNzUyMDMwMH0.uHsh_YhrJ5UzcwTXwipnF-0guZ6k8sKuYFwaMnpW9ls";
export const supabase: any = createClient(supabaseUrl, supabaseKey);

export const upLoadeIMG = async (file: any) => {
  const fileName = "images/" + uuid() + ".jpg"  ;
  const { error } = await supabase.storage
    .from("BIZWEB")
    .upload(fileName, file, { cacheControl: "image/jpg"});
  if (error) {
    throw error;
  }
  const { data } = await supabase.storage.from("BIZWEB").getPublicUrl(fileName);
  return data.publicUrl;
};

export const upLoadeVideo = async (file: any) => {
    const fileName = "video/" + uuid() + ".mp4"  ;
    const { error } = await supabase.storage
      .from("BIZWEB")
      .upload(fileName, file, { cacheControl: "video/mp4"});
    if (error) {
      throw error;
    }
    const { data } = await supabase.storage.from("BIZWEB").getPublicUrl(fileName);
    return data.publicUrl;
  };