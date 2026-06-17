import { supabase } from "../lib/supabase";

export const loginUser = async (
  email,
  password
) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  return { data, error };
};

export const logoutUser = async () => {
  await supabase.auth.signOut();
};