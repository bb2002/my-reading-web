"use client";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  LengthRow,
  LevelRow,
  LevelRows,
} from "@/utils/types/ReadingPromptOptions";
import { createReading } from "@/app/reading/actions";
import { useGuest } from "@/hooks/useGuest";

export default function ReadingPrompt() {
  const [selectedLevel, setSelectedLevel] = useState<LevelRow>(LevelRows[0]);
  const [selectedLength, setSelectedLength] = useState<LengthRow>(
    LevelRows[0].length[0]
  );
  const [originUrl, setOriginUrl] = useState<string>("");
  const { guestId } = useGuest();

  return (
    <div className="w-full h-32 border border-[#e5e5e5] rounded-2xl mt-16 shadow-md p-4 flex flex-col">
      <textarea
        className="w-full border-0 resize-none text-sm flex-1 focus:outline-none"
        cols={2}
        placeholder="https://www3.nhk.or.jp/news/html/20250223/k10014730811000.html"
        onChange={(e) => setOriginUrl(e.target.value)}
        value={originUrl}
      />
      <div className="flex">
        <Dropdown
          menu={{
            items: LevelRows.map((level) => ({
              label: level.label,
              key: level.key,
            })),
            onClick: (e) => {
              const newLevel =
                LevelRows.find((level) => level.key === e.key) ?? LevelRows[0];
              setSelectedLevel(newLevel);
              setSelectedLength(newLevel.length[0]);
            },
          }}
        >
          <Button>
            <Space>
              {selectedLevel?.label}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        &nbsp;
        <Dropdown
          menu={{
            items: selectedLevel.length.map((l) => ({
              label: l.label,
              key: l.key,
            })),
            onClick: (e) =>
              setSelectedLength(
                selectedLevel.length.find((l) => l.key === e.key) ??
                  selectedLevel.length[0]
              ),
          }}
        >
          <Button>
            <Space>
              {selectedLength?.label}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <form action={createReading} className="ml-auto">
          <input type="hidden" name="level" value={selectedLevel.key} />
          <input type="hidden" name="length" value={selectedLength.key} />
          <input type="hidden" name="originUrl" value={originUrl} />
          <input type="hidden" name="guestId" value={guestId} />
          <button type="submit">
            <div className="w-8 h-8 bg-[#F39C12] rounded-full flex items-center justify-center shadow">
              <SendOutlined style={{ color: "white" }} />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
