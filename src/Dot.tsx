import { DotProps } from "recharts";

type TDotProps = {
  value?: number;
  maxValue: number;
  minValue: number;
  color: string;
  activeColor: string;
} & DotProps;

export const Dot = ({cx, cy, r, value, maxValue, minValue, color, activeColor}: TDotProps) => {
  if (cx === undefined || cy === undefined || value === undefined) {
    return null;
  }

  const isOutlier = value > maxValue || value < minValue;
  const dotColor = isOutlier ? activeColor : color;

  return (
    <circle cx={cx} cy={cy} r={r} fill={dotColor}/>
  );
};