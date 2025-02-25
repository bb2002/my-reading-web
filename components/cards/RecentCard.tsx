import Link from "next/link";
import Card from "./Card";

type RecentReadingCard = {
  contentId: string;
  content: string;
  userId: string;
  createdAt: Date;
};

function formatRelativeTime(createdAt: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime(); // 경과 시간 (밀리초)
  const diffMin = Math.floor(diffMs / 1000 / 60); // 경과 시간 (분 단위)

  if (diffMin < 1) {
    return "방금 전";
  } else if (diffMin < 60) {
    return `${diffMin}분 전`;
  } else {
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) {
        return `${diffDays}일 전`;
      } else {
        const diffWeeks = Math.floor(diffDays / 7);
        return `${diffWeeks}주 전`;
      }
    }
  }
}

export default function RecentCard({
  content,
  userId,
  contentId,
  createdAt,
}: RecentReadingCard) {
  const relativeTime = formatRelativeTime(createdAt);

  return (
    <Link href={`/reading/${contentId}`}>
      <Card>
        <div className="flex mb-2 flex-bet">
          <p className="font-pretendard text-sm text-black font-bold flex-1">
            @{userId}
          </p>
          <p className="font-pretendard text-sm text-[#707070] font-semibold">
            {relativeTime}
          </p>
        </div>
        <p className="font-pretendard text-sm text-[#707070]">
          {content.slice(0, 100)}
        </p>
      </Card>
    </Link>
  );
}
