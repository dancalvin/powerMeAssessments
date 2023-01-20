import {FC, useMemo} from "react";
import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from "recharts";

interface IProps {
  metabolicAge?: number;
  age?: number;
}

const MetabolicScoreGraphResponsive: FC<IProps> = (props) => {
  const {age, metabolicAge} = props;
  const ageData = useMemo(() => {
    return [
      {name: "Group A", value: age, fill: "#A3C2C4"},
      {
        name: "Group B",
        value: 100 - (age || 0),
        fill: "transparent",
      },
    ]
  }, [age]);

  const metabolicAgeData = useMemo(() => {
    return [
      {name: "A1", value: metabolicAge, fill: "#545A88"},
      {
        name: "A2",
        value: 100 - (metabolicAge || 0),
        fill: "transparent",
      },
    ];
  }, [metabolicAge])

  return (
    <ResponsiveContainer width="100%"
                         height="100%"
                         className="h-[300px] w-[300px] sm:h-[400px]">
      <PieChart width={200} height={300} className="h-[300px] sm:h-[400px]">
        <Pie
          data={ageData}
          dataKey="value"
          cx="50%"
          cy="50%"
          radius={55}
          innerRadius={55}
          outerRadius={55}
          startAngle={90}
          endAngle={-500}
          stroke="#000000"
        >
          {ageData.map((entry, index) => (
            <Cell key={`cell-center-0`} fill={entry.fill}/>
          ))}
        </Pie>

        <Pie
          data={ageData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={60}
          startAngle={90}
          endAngle={-500}
          paddingAngle={0}
          stroke="0"
        >
          {ageData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill}/>
          ))}
        </Pie>

        <Pie
          data={metabolicAgeData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={75}
          outerRadius={75}
          startAngle={90}
          endAngle={-500}
          stroke="#000000"
        >
          {metabolicAgeData.map((entry, index) => (
            <Cell key={`cell-center-1`} fill={entry.fill}/>
          ))}
        </Pie>

        <Pie
          data={metabolicAgeData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={80}
          startAngle={90}
          endAngle={-500}
          stroke="0"
        >
          {metabolicAgeData.map((entry, index) => (
            <Cell key={`cell-${index + 1}`} fill={entry.fill}/>
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default MetabolicScoreGraphResponsive;
