import Image from "next/image";
import { Button } from "antd";

export default function Header() {
  return (
    <header className="w-full h-16 border-b border-b-[#DFDFDF] flex justify-center">
      <div className="w-full max-w-[480px] flex items-center justify-between mx-4">
        <Image
          src="/reading-icon.svg"
          alt="MyReadingWeb"
          width="24"
          height="24"
        />
        <Button type="text">로그인</Button>
      </div>
    </header>
  );
}
