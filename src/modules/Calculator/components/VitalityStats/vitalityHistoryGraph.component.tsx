import {FC} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {IVitalityScoreData} from "../../interfaces/vitalityScoreData.interface";

interface IProps {
  line1Color: string;
  line2Color?: string;
  lineData: IVitalityScoreData[];
  yLabel: string;
  line1DataKey: string;
  line2DataKey?: string;
}

const VitalityHistoryGraph: FC<IProps> = (props) => {

  const {line1Color, line2Color, lineData, yLabel, line2DataKey, line1DataKey} = props;

  return (
    <div style={{width: "100%"}}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={400}
          data={lineData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              offset: 12,
            }}
            minTickGap={5}
            allowDecimals={false}
          />
          <Tooltip/>
          <Line
            type="monotone"
            dataKey={line1DataKey}
            stroke={line1Color}
            fill={line1Color}
            dot={{stroke: line1Color, strokeWidth: 8}}
          />

          {
            line2DataKey &&
            <Line
              type="monotone"
              dataKey={line2DataKey}
              stroke={line2Color}
              fill={line2Color}
              dot={{stroke: line2Color, strokeWidth: 8}}
            />
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VitalityHistoryGraph;
