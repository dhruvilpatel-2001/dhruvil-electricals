import { supabase } from "./supabaseClient";

export async function uploadImage(file, folder = "uploads") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  // Upload image to bucket: work-images
  const { error: uploadError } = await supabase.storage
    .from("work-images")
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  // Get public URL
  const { data: publicUrl } = supabase.storage
    .from("work-images")
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}
