import { ReactNode } from "react";

export const SplitScreenAdmin = ({
  children,
  containerClassName = "flex h-screen",
  leftClassName = "",
  rightClassName = "",
}: {
  children: [ReactNode, ReactNode];
  containerClassName?: string;
  leftClassName?: string;
  rightClassName?: string;
}) => {
  const [left, right] = children;
  return (
    <div className={containerClassName}>
      <div className={leftClassName}>{left}</div>
      <div className={rightClassName}>{right}</div>
    </div>
  );
};
