import LinkedCard from "@/components/cards/LinkedCard";
import RecentCard from "@/components/cards/RecentCard";
import ReadingPrompt from "@/components/ReadingPrompt";
import { BookOutlined, EditOutlined, OpenAIOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <div className="my-16 w-full flex flex-col">
      <p className="text-5xl font-pretendard font-bold mx-auto m-2 text-[#1F1F1F]">
        원하는 주제를
      </p>
      <p className="text-5xl font-pretendard font-bold mx-auto m-2 text-[#1F1F1F]">
        <span className="text-[#F39C12]">JLPT</span> 독해 처럼
      </p>

      <ReadingPrompt />

      <div className="w-full mt-6">
        <LinkedCard
          title="좋아하는 글로 독해 공부"
          line1="웹에 게시된 모든 글을 독해 공부하듯 읽어봐요."
          line2="선택한 자격증 수준에 맞는 문법과 단어를 사용하게 돼요."
          icon={<EditOutlined />}
          style={{ marginBottom: 8 }}
        />
        <LinkedCard
          title="AI 기반 단어 검색"
          line1="모르는 단어가 나와도 걱정 말아요."
          line2="문맥을 파악하여 가장 적절한 뜻을 알려줘요."
          icon={<OpenAIOutlined />}
          style={{ marginBottom: 8 }}
        />
        <LinkedCard
          title="단어장으로 복습"
          line1="단어장에 단어를 저장하고, 예문과 출제 경향도 알아봐요."
          icon={<BookOutlined />}
        />
      </div>

      <div className="w-full mt-6">
        <h3 className="w-full text-2xl font-pretendard text-center font-bold mb-6">
          방금 만들어진 글
        </h3>
        <RecentCard
          content="スマホ、モバイルバッテリー、ワイヤレスイヤホン…。いま、身近な製品に使われているリチウムイオン電池が発火する事故が相次いでいる。充電中に突然火が出るなど、リチウムイオン電池が使われた製品の事故件数は１０年で５倍に増加。深刻なのがごみ処理施設での事故で、先月"
          userId="Ballbot3"
          contentId="12345678-12345678"
          createdAt={new Date()}
        />
      </div>

      <div className="w-full font-light text-sm text-[#707070] my-6">
        <p className="text-center">© 2015-2025 Ballbot</p>
      </div>
    </div>
  );
}
