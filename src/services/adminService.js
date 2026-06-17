import { supabase } from "../lib/supabase";

export const getAdminByEmail = async (email) => {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;

  return data;
};