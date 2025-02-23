import ReadingPrompt from "@/components/ReadingPrompt";

export default function Home() {
  return (
    <div className="my-16 w-full flex flex-col ">
      <p className="text-5xl font-pretendard font-bold mx-auto m-2">
        원하는 주제를
      </p>
      <p className="text-5xl font-pretendard font-bold mx-auto m-2">
        <span className="text-[#F39C12]">JLPT</span> 독해 처럼
      </p>

      <ReadingPrompt />
    </div>
  );
}
