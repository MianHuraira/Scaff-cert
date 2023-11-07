// ** Third Party Components
import { Bar } from "react-chartjs-2";
import Flatpickr from "react-flatpickr";
import { Calendar } from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const ChartjsBarChart = ({
  success,
  gridLineColors,
  labelColors,
  labels,
  Ctitle,
}) => {
  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: gridLineColors,
          borderColor: gridLineColors,
        },
        ticks: { color: labelColors },
      },
      y: {
        min: 0,
        max: 400,
        grid: {
          color: gridLineColors,
          borderColor: gridLineColors,
        },
        ticks: {
          stepSize: 100,
          color: labelColors,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  // ** Chart data
  const data = {
    // labels: ["Dry Hire job", "Good Inspection complete", "Inspection Overdue", "Unsinged job"],
    labels: labels,
    datasets: [
      {
        maxBarThickness: 15,
        backgroundColor: " #2873B9",
        borderColor: "transparent",
        borderRadius: { topRight: 15, topLeft: 15 },
        data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190],
      },
    ],
  };

  return (
    <Card className="h-100 mb-0">
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        {/* <CardTitle className="card_title" tag="h4">Total Number of Payments</CardTitle> */}
        <CardTitle className="card_title" tag="h4">
          {Ctitle} {/* Assuming the prop name is 'title' */}
        </CardTitle>
        <div>
          <div
            style={{
              border: "1px solid #BFC5D0",
              padding: "7px",
              borderRadius: "5px",
            }}
          >
            <Calendar size={14} /> This Week
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: "250px" }}>
          <Bar data={data} options={options} height={400} />
        </div>
      </CardBody>
    </Card>
  );
};
export default ChartjsBarChart;
