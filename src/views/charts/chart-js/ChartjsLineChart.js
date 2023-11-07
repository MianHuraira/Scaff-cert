// ** Third Party Components
import { Line } from "react-chartjs-2";
import { Calendar } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

const ChartjsLineChart = ({
  labelColor,
  gridLineColor,
  warningColorShade,
  lineChartDanger,
  lineChartPrimary,
}) => {
  // ** Chart Options
  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor,
        },
      },
      y: {
        min: 0,
        max: 400,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor,
        },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor,
        },
      },
    },
    plugins: {
      legend: {
        align: "start",
        position: "top",
        labels: {
          boxWidth: 10,
          marginBottom: 25,
          color: labelColor,
          usePointStyle: true,
        },
      },
    },
  };

  // ** Chart Data
  const data = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
    datasets: [
      {
        data: [
          80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
          375,
        ],
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: "Signed",
        pointHoverRadius: 5,
        pointStyle: "circle",
        pointHoverBorderWidth: 5,
        borderColor: lineChartDanger,
        pointBorderColor: "transparent",
        backgroundColor: "#37C39E",
        pointHoverBackgroundColor: lineChartDanger,
      },
      {
        data: [
          80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200,
          280,
        ],
        fill: false,
        tension: 0.5,
        label: "Signed",
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: "circle",
        pointHoverBorderWidth: 5,
        borderColor: lineChartPrimary,
        pointBorderColor: "transparent",
        backgroundColor: "#EE658E",
        pointHoverBackgroundColor: lineChartPrimary,
      },
    ],
  };

  //** To add spacing between legends and chart
  const plugins = [
    {
      beforeInit(chart) {
        chart.legend.afterFit = function () {
          this.height += 20;
        };
      },
    },
  ];

  return (
    <Card>
      <CardHeader className='className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column"'>
        <CardTitle className="mb-75 card_title" tag="h4">
          Inspection Signed Status
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
        <div style={{ height: "450px" }}>
          <Line data={data} options={options} height={450} plugins={plugins} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsLineChart;
