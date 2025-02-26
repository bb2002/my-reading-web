export type LengthRow = {
  key: string;
  label: string;
};

export type LevelRow = {
  key: string;
  label: string;
  length: LengthRow[];
};

export const LengthRowJLPT: LengthRow[] = [
  {
    key: "short",
    label: "내용이해 (단문)",
  },
  {
    key: "medium",
    label: "내용이해 (중문)",
  },
  {
    key: "long",
    label: "내용이해 (장문)",
  },
  {
    key: "integrate",
    label: "통합이해",
  },
  {
    key: "claim",
    label: "주장이해",
  },
  {
    key: "search",
    label: "정보검색",
  },
];

export const LevelRows: LevelRow[] = [
  {
    key: "jlpt_n1",
    label: "JLPT N1",
    length: LengthRowJLPT,
  },
  {
    key: "jlpt_n2",
    label: "JLPT N2",
    length: LengthRowJLPT,
  },
];
