import Image from "next/image";
import LoginButton from "./buttons/LoginButton";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header className="w-full h-16 border-b border-b-[#DFDFDF] flex justify-center">
      <div className="w-full max-w-[480px] flex items-center justify-between mx-4">
        <Image
          src="/reading-icon.svg"
          alt="MyReadingWeb"
          width="24"
          height="24"
        />
        {session ? (
          <div className="text-sm">
            <span className="mr-4 font-bold">
              @{session.user?.user_metadata?.name}
            </span>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
