import React from "react";
import { WeddingStatus } from "../types/admin.types";
import { WEDDING_STATUS_CONFIG } from "../constants/admin.constants";

interface StatusBadgeProps {
  status: WeddingStatus;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
  showIcon = true,
  className = "",
}) => {
  const config = WEDDING_STATUS_CONFIG[status];

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-semibold
        ${config.bgColor} ${config.color}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
};
