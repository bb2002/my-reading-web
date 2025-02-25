import Image from "next/image";
import LoginButton from "./buttons/LoginButton";
import { createClient } from "@/utils/supabase/server";
import { Dropdown, MenuProps, Space } from "antd";
import { BookOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: session?.user?.user_metadata?.name,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "내 단어장",
      icon: <BookOutlined />,
    },
    {
      key: "3",
      label: "내 독해",
      icon: <EditOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "로그아웃",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <header className="w-full h-16 border-b border-b-[#DFDFDF] flex justify-center">
      <div className="w-full max-w-[480px] flex items-center justify-between mx-4">
        <Link href="/">
          <Image
            src="/reading-icon.svg"
            alt="MyReadingWeb"
            width="24"
            height="24"
            style={{ color: "#1f1f1f" }}
          />
        </Link>

        {session ? (
          <Dropdown menu={{ items }}>
            <p className="text-[#1f1f1f] text-sm font-semibold cursor-pointer">
              @{session.user?.user_metadata?.name}
            </p>
          </Dropdown>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
