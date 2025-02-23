"use client";
import { Button, Dropdown, MenuProps, Skeleton, Space } from "antd";
import styles from "./ReadingPrompt.module.css";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { Database } from "@/utils/types/Database";

type LevelRow = Database["public"]["Tables"]["levels"]["Row"];
type LengthRow = {
  key: string;
  label: string;
};

export default function ReadingPrompt() {
  const { data, error, isLoading } = useSWR<LevelRow[]>("/api/level", fetcher);
  const [levelMenuItems, setLevelMenuItems] = useState<MenuProps["items"]>([]);
  const [selectedLevel, setSelectedLevel] = useState<LevelRow | undefined>();
  const [selectedLength, setSelectedLength] = useState<LengthRow | undefined>();

  const lengthMenuItems: LengthRow[] = [
    {
      key: "short",
      label: "단문",
    },
    {
      key: "medium",
      label: "중문",
    },
    {
      key: "long",
      label: "장문",
    },
  ];

  useEffect(() => {
    if (data) {
      setLevelMenuItems(
        data.map((d: LevelRow) => ({
          label: d.label,
          key: d.id,
        }))
      );
      setSelectedLevel(data[0]);
      setSelectedLength(lengthMenuItems[0]);
    }
  }, [data]);

  return (
    <div className="w-full h-32 border border-[#e5e5e5] rounded-2xl mt-16 shadow-md p-4 flex flex-col">
      {isLoading ? (
        <Skeleton paragraph={{ rows: 2 }} />
      ) : (
        <>
          <textarea
            className={styles.prompt}
            cols={2}
            placeholder="https://www3.nhk.or.jp/news/html/20250223/k10014730811000.html"
          />
          <div className="flex">
            <Dropdown
              menu={{
                items: levelMenuItems,
                onClick: (e) =>
                  setSelectedLevel(data?.find((d) => d.id === Number(e.key))),
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
                items: lengthMenuItems,
                onClick: (e) =>
                  setSelectedLength(
                    lengthMenuItems.find((d) => d.key === e.key)
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
            <Button
              type="primary"
              shape="circle"
              icon={<UploadOutlined />}
              style={{ marginLeft: "auto" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
