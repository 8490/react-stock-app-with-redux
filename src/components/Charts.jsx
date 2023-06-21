import { Card, Title, LineChart } from "@tremor/react";
import { useSelector } from "react-redux";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}%`;

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock);
  const salesData = sales.map((item) => ({
    date: item.createds,
    sale: item.price_total,
  }));
  return (
    <Card className="mt-4">
      <Title>Total Sales</Title>
      <LineChart
        className="mt-6"
        data={""}
        index="date"
        categories={["Export Growth Rate", "Import Growth Rate"]}
        colors={["emerald", "gray"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default Charts;
