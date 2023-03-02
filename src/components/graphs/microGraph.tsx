import './microGraph.css';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const MicroGraphs = () => {
  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page A', uv: 600, pv: 2400, amt: 2400 },
    { name: 'Page A', uv: 300, pv: 2400, amt: 2400 },
  ];

  return (
    <div className="micrograph">
      <LineChart width={190} height={90} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
        <Tooltip />
      </LineChart>
    </div>
  );
};

export { MicroGraphs };
