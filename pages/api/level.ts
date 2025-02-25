import { supabase } from "@/utils/supabase/client";
import { Database } from "@/utils/types/Database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Database["public"]["Tables"]["levels"]["Row"][]>
) {
  const { data, error } = await supabase
    .from("levels")
    .select("id, label, is_enabled")
    .eq("is_enabled", true);

  res.status(200).json(data ?? []);
}
