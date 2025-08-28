import { ReactNode } from "react";

export const SplitScreenAdmin = ({
  children,
}: {
  children: [ReactNode, ReactNode];
}) => {
  const [left, right] = children;
  return (
    <div className="flex h-screen">
      {left}
      {right}
    </div>
  );
};
