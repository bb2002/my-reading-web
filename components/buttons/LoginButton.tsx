import { Button } from "antd";
import Link from "next/link";

export default function LoginButton() {
  return (
    <Link href="/auth/google">
      <Button type="text">로그인</Button>
    </Link>
  );
}
