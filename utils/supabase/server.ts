import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "../types/database.types";

type CreateClientProps = {
  admin?: boolean;
};

export async function createClient(props?: CreateClientProps) {
  const cookieStore = await cookies();
  console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    {
      cookies: {
        getAll() {
          if (props?.admin) {
            return [];
          }
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
