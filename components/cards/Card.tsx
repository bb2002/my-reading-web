type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default function Card({ children, style, onClick }: CardProps) {
  const baseClassName =
    "w-full flex flex-col border border-gray-300 rounded-lg bg-white p-4 " +
    "hover:shadow-md hover:border-black transition duration-200";

  return (
    <div className={baseClassName} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
