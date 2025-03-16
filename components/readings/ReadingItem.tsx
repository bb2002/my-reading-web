import { Card } from "antd";
import Meta from "antd/es/card/Meta";

type ReadingItemProps = {
  style?: React.CSSProperties;
};

export default function ReadingItem({ style }: ReadingItemProps) {
  return (
    <Card style={{ width: "100%" }} hoverable>
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
}
