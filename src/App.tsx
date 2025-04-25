import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LegendType
} from 'recharts';
import { COLORS, mokRechartsData } from "./constants";
import { getMinMaxOffsetPosition } from "./utils";
import { Dot } from "./Dot";

const offsetPv = getMinMaxOffsetPosition(mokRechartsData.map((val) => val.pv));
const offsetUv = getMinMaxOffsetPosition(mokRechartsData.map((val) => val.uv));

const legends: {color: string, type: LegendType, value: string}[] = [
  {color: COLORS.PURPLE, type: 'line', value: 'pv'},
  {color: COLORS.GREEN, type: 'line', value: 'uv'},
];

const DOT_RADIUS = {
  DEFAULT: 3,
  ACTIVE: 5,
} as const;

export const App = () => {
  return (
    <div className="container">
      <ResponsiveContainer width="70%" height="70%">
        <LineChart
          width={500}
          height={300}
          data={mokRechartsData}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend payload={legends}/>
          <defs>
            <linearGradient id="pvColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={offsetPv.max} stopColor={COLORS.RED} stopOpacity={1}/>
              <stop offset={offsetPv.max} stopColor={COLORS.PURPLE} stopOpacity={1}/>
              <stop offset={offsetPv.min} stopColor={COLORS.PURPLE} stopOpacity={1}/>
              <stop offset={offsetPv.min} stopColor={COLORS.RED} stopOpacity={1}/>
            </linearGradient>
            <linearGradient id="uvColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={offsetUv.max} stopColor={COLORS.RED} stopOpacity={1}/>
              <stop offset={offsetUv.max} stopColor={COLORS.GREEN} stopOpacity={1}/>
              <stop offset={offsetUv.min} stopColor={COLORS.GREEN} stopOpacity={1}/>
              <stop offset={offsetUv.min} stopColor={COLORS.RED} stopOpacity={1}/>
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="pv"
            stroke="url(#pvColor)"
            dot={<Dot
              color={COLORS.PURPLE}
              activeColor={COLORS.RED}
              minValue={offsetPv.minValue}
              maxValue={offsetPv.maxValue}
              r={DOT_RADIUS.DEFAULT}
            />}
            activeDot={
              <Dot
                color={COLORS.PURPLE}
                activeColor={COLORS.RED}
                minValue={offsetPv.minValue}
                maxValue={offsetPv.maxValue}
                r={DOT_RADIUS.ACTIVE}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="url(#uvColor)"
            dot={<Dot
              color={COLORS.GREEN}
              activeColor={COLORS.RED}
              minValue={offsetUv.minValue}
              maxValue={offsetUv.maxValue}
              r={3}
            />}
            activeDot={
              <Dot
                color={COLORS.GREEN}
                activeColor={COLORS.RED}
                minValue={offsetUv.minValue}
                maxValue={offsetUv.maxValue}
                r={5}
              />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
