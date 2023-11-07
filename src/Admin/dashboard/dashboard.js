/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import "./dashboard.css";
import "../Pages/table.css";
import { NavLink } from "react-router-dom";
import ChartjsLineChart from "../../views/charts/chart-js/ChartjsLineChart";
import ChartjsBarChart from "../../views/charts/chart-js/ChartjsBarChart";
import "@styles/react/apps/app-users.scss";
import img_crd_1 from "../../Admin/assests/img_crd_1.png";
import img_crd_2 from "../../Admin/assests/img_crd_2.png";
import img_crd_3 from "../../Admin/assests/img_crd_3.png";
import img_crd_4 from "../../Admin/assests/img_crd_4.png";
import img_crd_5 from "../../Admin/assests/img_crd_5.png";
import img_crd_6 from "../../Admin/assests/img_crd_6.png";
import img_crd_7 from "../../Admin/assests/img_crd_7.png";
import img_crd_8 from "../../Admin/assests/img_crd_8.png";

import "@styles/react/libs/tables/react-dataTable-component.scss";
import axios from "axios";

const AdminDashboard = () => {
  const tooltipShadow = "rgba(0, 0, 0, 0.1)";
  const successColorShade = "#00cc66";
  const warningLightColor = "#ffcc00";
  const primary = "#007bff";
  const labelColor = "#333";
  const gridLineColor = "#ccc";
  const warningColorShade = "#ffcc00";
  const lineChartDanger = "#ff0000";
  const lineChartPrimary = "#007bff";
  const successColor = "#00cc66";
  const gridLineColors = "#ccc";
  const labelColors = "#333";
  // TABLE DATA

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/jobs`)
      .then((res) => {
        const resp = res.data.data;
        const filterData = resp.filter((item) => item.day_hire === "true");
        setData(filterData?.length);
        console.log(filterData.length);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  // style img

  return (
    <>
      <div>
        {isLoading ? (
          <div className="mt-3 d-flex justify-content-center align-items-center vh-75 w-100">
            <Spinner animation="border" variant="dart" size="lg" />
          </div>
        ) : (
          <>
            {/* card row start */}

            <Row>
              <Col className="mb-2" xl="3" lg="4" md="4" sm="6">
                <NavLink to="/hire_job">
                  <div className="card bg_crd_1 radius_10 crd_hight mb-0">
                    <div className="card-body">
                      <div className="d-flex justify-content-between h-100">
                        <div className="d-flex flex-column justify-content-between h-100">
                          <h5 className="card_text text_head">Dry Hire Jobs</h5>
                          <h4 className="card_text">{data}</h4>
                        </div>
                        <img
                          style={{ width: "55px", height: "31px" }}
                          src={img_crd_1}
                        />
                      </div>
                    </div>
                  </div>
                </NavLink>
              </Col>
              <Col className="mb-2" xl="3" lg="4" md="4" sm="6">
                <div className="card bg_crd_2 radius_10 crd_hight mb-0">
                  <div className="card-body">
                    <div className="d-flex  justify-content-between h-100">
                      <div className="d-flex flex-column justify-content-between h-100">
                        <h5 className="card_text text_head">
                          Not Yet Handover
                        </h5>
                        <h4 className="card_text">00</h4>
                      </div>
                      <img
                        style={{ width: "54px", height: "25px" }}
                        src={img_crd_2}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-2" xl="3" lg="4" md="4" sm="6">
                <div className="card bg_crd_3 radius_10 crd_hight mb-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between h-100">
                      <div className="d-flex flex-column justify-content-between h-100">
                        <h5 className="card_text text_head">
                          Good Inspection Complete
                        </h5>
                        <h4 className="card_text">00</h4>
                      </div>
                      <img
                        style={{ width: "55px", height: "31px" }}
                        src={img_crd_3}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-2" xl="3" lg="4" md="4" sm="6">
                <div className="card bg_crd_4 radius_10 crd_hight mb-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between h-100">
                      <div className="d-flex flex-column justify-content-between h-100">
                        <h5 className="card_text text_head">
                          Inspection Due In Next Week
                        </h5>
                        <h4 className="card_text">00</h4>
                      </div>
                      <img
                        style={{ width: "55px", height: "31px" }}
                        src={img_crd_4}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-2" xl="3" lg="4" md="4" sm="6">
                <div className="card bg_crd_5 radius_10 crd_hight mb-0">
                  <div className="card-body">
                    <div className="d-flex  justify-content-between h-100">
                      <div className="d-flex flex-column justify-content-between h-100">
                        <h5 className="card_text text_head">
                          Inspection OverDue (After 30 days)
                        </h5>
                        <h4 className="card_text">00</h4>
                      </div>
                      <img
                        style={{ width: "55px", height: "31px" }}
                        src={img_crd_5}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-2" xl="3" lg="4" md="4" sm="6">
                <div className="card bg_crd_6 radius_10 crd_hight mb-0">
                  <div className="card-body">
                    <div className="d-flex  justify-content-between h-100">
                      <div className="d-flex flex-column justify-content-between h-100">
                        <h5 className="card_text text_head">
                          Failed Inspection
                        </h5>
                        <h4 className="card_text">00</h4>
                      </div>
                      <img
                        style={{ width: "55px", height: "31px" }}
                        src={img_crd_6}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-2" xl="3" lg="4" md="4" sm="6">
                <div className="card bg_crd_7 radius_10 crd_hight mb-0">
                  <div className="card-body">
                    <div className="d-flex  justify-content-between h-100">
                      <div className="d-flex flex-column justify-content-between h-100">
                        <h5 className="card_text text_head">
                          Inspection Not Signed
                        </h5>
                        <h4 className="card_text">00</h4>
                      </div>
                      <img
                        style={{ width: "55px", height: "31px" }}
                        src={img_crd_7}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="mb-2" xl="3" lg="4" md="4" sm="6">
                <div className="card bg_crd_8 radius_10 crd_hight mb-0">
                  <div className="card-body">
                    <div className="d-flex  justify-content-between h-100">
                      <div className="d-flex flex-column justify-content-between h-100">
                        <h5 className="card_text text_head">
                          Total Of Jobs In Progress
                        </h5>
                        <h4 className="card_text">00</h4>
                      </div>
                      <img
                        style={{ width: "55px", height: "31px" }}
                        src={img_crd_8}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {/* chart start */}

            <Row>
              <Col lg="7" className="mb-2">
                <ChartjsBarChart
                  success={successColor}
                  gridLineColor={gridLineColors}
                  labelColor={labelColors}
                  labels={[
                    "Dry Hire jobss",
                    "Good Inspection complete",
                    "Inspection Overdue",
                    "Unsinged job",
                  ]}
                  Ctitle={"Job Status"}
                />
              </Col>
              <Col lg="5" className="mb-2">
                <ChartjsBarChart
                  success={successColor}
                  gridLineColor={gridLineColors}
                  labelColor={labelColors}
                  labels={["Inventory", "On-Hand", "On-Site"]}
                  Ctitle={"Inventory Status"}
                />
              </Col>
              <Col lg="12" className="mb-2">
                <ChartjsLineChart
                  labelColor={labelColor}
                  gridLineColor={gridLineColor}
                  warningColorShade={warningColorShade}
                  lineChartDanger={lineChartDanger}
                  lineChartPrimary={lineChartPrimary}
                />
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
