import ReadingItem from "@/components/readings/ReadingItem";
import { createClient } from "@/utils/supabase/server";
import Title from "antd/es/typography/Title";
import { cookies } from "next/headers";

export default async function Reading() {
  const cookieStore = await cookies();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const guestId = cookieStore.get("guestId")?.value ?? "";
  const readings = await (user
    ? supabase.from("readings").select("*").eq("owner", user.id)
    : supabase.from("readings").select("*").eq("guestId", guestId));

  return (
    <>
      <Title level={3}>
        {user ? user.user_metadata.name : "게스트"}님의 글
      </Title>
    </>
  );
}
