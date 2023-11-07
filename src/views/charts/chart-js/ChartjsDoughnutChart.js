// ** Third Party Components
import { Doughnut } from "react-chartjs-2";
import { Monitor, Tablet, ArrowDown, ArrowUp } from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { Col, Row } from "react-bootstrap";

const ChartjsRadarChart = ({
  tooltipShadow,
  successColorShade,
  warningLightColor,
  primary,
}) => {
  // ** Chart Options
  const options = {
    maintainAspectRatio: false,
    cutout: 60,
    animation: {
      resize: {
        duration: 500,
      },
    },
    plugins: {
      legend: { display: false },
      tooltips: {
        callbacks: {
          label(context) {
            console.log(context);
            const label = context.label || "";
            if (label) {
              label += "Ronak: ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: tooltipShadow,
        backgroundColor: "#fff",
        titleFontColor: "#000",
        bodyFontColor: "#000",
      },
    },
  };

  // ** Chart data
  const data = {
    datasets: [
      {
        labels: ["Tablet", "Mobile", "Desktop"],
        data: [10, 10, 80],
        backgroundColor: ["#58D0FF", "#FF6161", "#2873B9"],
        borderWidth: 0,
        pointStyle: "rectRounded",
      },
    ],
  };

  return (
    <Card className="h-100 mb-0">
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">Total Number Of clients</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: "170px" }}>
          <Doughnut data={data} options={options} height={275} />
        </div>
        <Row className="mt-2">
          <Col lg="6">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    backgroundColor: "#58D0FF",
                    borderRadius: "50%",
                  }}
                ></div>
                <span className="fw-bold ms-75 me-25">Active Users</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    backgroundColor: "#FF6161",
                    borderRadius: "50%",
                  }}
                ></div>
                <span className="fw-bold ms-75 me-25">Inactive Users</span>
              </div>
              <div></div>
            </div>

            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    backgroundColor: "#2873B9",
                    borderRadius: "50%",
                  }}
                ></div>
                <span className="fw-bold ms-75 me-25">New Users</span>
              </div>
              <div></div>
            </div>
          </Col>
          <Col lg="6">
            <h5 className="tota_client">
              <strong style={{fontSize:'32px'}}>70 K</strong> <br /> <span>Total Clients</span>
            </h5>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ChartjsRadarChart;
