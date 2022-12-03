import React from "react";
import { Spin } from "antd";

export default function SpinLoader({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return <Spin spinning={isLoading}>{children}</Spin>;
}
