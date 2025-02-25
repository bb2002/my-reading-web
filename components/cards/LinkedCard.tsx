import Link from "next/link";
import Card from "./Card";

type LinkedCardProps = {
  title?: string;
  line1?: string;
  line2?: string;
  icon?: React.ReactNode;
  href?: string;
  style?: React.CSSProperties;
};

export default function LinkedCard({
  title,
  line1,
  line2,
  icon,
  href,
  style,
}: LinkedCardProps) {
  if (href) {
    return (
      <Link href={href}>
        <Card style={{ ...style, cursor: "pointer", height: 106 }}>
          <div className="flex mb-2">
            {icon}
            <h4 className="ml-2 font-pretendard text-[#1c1c1c] font-semibold">
              {title}
            </h4>
          </div>
          <p className="font-pretendard text-sm text-[#707070]">{line1}</p>
          <p className="font-pretendard text-sm text-[#707070]">{line2}</p>
        </Card>
      </Link>
    );
  }

  return (
    <Card style={{ ...style, height: 106 }}>
      <div className="flex mb-2">
        {icon}
        <h4 className="ml-2 font-pretendard text-[#1c1c1c] font-semibold">
          {title}
        </h4>
      </div>
      <p className="font-pretendard text-sm text-[#707070]">{line1}</p>
      <p className="font-pretendard text-sm text-[#707070]">{line2}</p>
    </Card>
  );
}
