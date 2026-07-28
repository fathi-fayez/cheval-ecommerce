type TitleProps = {
  text1: string;
  text2: string;
  className?: string;
};

export default function Title({ text1, text2, className = "" }: TitleProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-center text-2xl sm:text-3xl ${className}`}
    >
      <p className="text-muted-light">
        {text1} <span className="font-medium text-foreground">{text2}</span>
      </p>
      <span className="hidden h-[2px] w-8 bg-foreground sm:inline-block sm:w-12" />
    </div>
  );
}
