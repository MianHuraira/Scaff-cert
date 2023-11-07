import { React, useState, useEffect } from "react";
import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
import "./table.css";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { Button } from "reactstrap";
import { Breadcrumb, Card, Col, Row, Spinner } from "react-bootstrap";
import Select from "react-select";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";
import check from "../../Admin/assests/check.png";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

const Subscriptions = () => {
  let datas = [
    {
      srno: "09",
      SubName: "Basic Plan",
      SubRate: "299.878 AUD",
      subPeriod: "1 Year Plan",
      job_qty: "20 Job",
      remaining_qty: "5000.00",
      start_date: "5000.00",
      end_date: "5000.00",
      status: "Active",
    },
    // {
    //   srno: "09",
    //   SubName: "Basic Plan",
    //   SubRate: "299.878 AUD",
    //   subPeriod: "1 Year Plan",
    //   job_qty: "20 Job",
    //   remaining_qty: "5000.00",
    //   start_date: "5000.00",
    //   end_date: "5000.00",
    //   status: "Delete",
    // },
  ];

  const [isLoading, setIsLoading] = useState(true);

  // show data start code

  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/adminsubscription`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false); // Hide spinner after data is fetched
      });
  }

  useEffect(() => {
    getData();
  }, []);

  // get admin subscription

  const columns = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Subscription name",
      selector: (row) => row.SubName,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Subscriptoin Rate",
      selector: (row) => row.SubRate,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Subscriptoin Period",
      selector: (row) => row.subPeriod,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Job Qty",
      selector: (row) => row.job_qty,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Remaining Job Qty",
      selector: (row) => row.remaining_qty,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Start Date",
      cell: (row) => row.start_date,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "End Date",
      cell: (row) => row.end_date,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="d-flex align-items-center">
          {row.status === "Active" ? (
            <>
              <img
                src={active}
                alt="active"
                width="11"
                height="11"
                className="me-1"
              />
              <span>{row.status}</span>
            </>
          ) : (
            <>
              <img
                src={block}
                alt="block"
                width="11"
                height="11"
                className="me-1"
              />
              <span>{row.status}</span>
            </>
          )}
        </div>
      ),
      sortable: true,
    },
  ];

  const [activeButton, setActiveButton] = useState("Monthly");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div>
      <>
        <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
          <h5 className="head_title">Subscription</h5>
          <Button className="default_btn">Add Subscription</Button>
        </div>
        <div className="d-flex align-align-items-center justify-content-between mt-2">
          <h5 className="head_title">List of Subscriptions</h5>
          <input
            type="search"
            placeholder="Search"
            className="form-control"
            style={{ width: "fit-content" }}
          />
        </div>

        <div className="table_main p-1 mt-2 pb-3">
          <ClientDataTable columns={columns} data={datas} />
        </div>
        <div className="table_main p-1 mt-2 pb-2 d-flex align-items-center justify-content-center flex-column">
          <div className="mt-1 text-center">
            <h4 className="modal_title">Subscriptions</h4>
            <h5 className="modal_subtitle">
              Select the subscription of your choice that suits you best
              according to your business requirements.
            </h5>
          </div>
          <div className="mt-1">
            <Button
              className={`togl_btn ${
                activeButton === "Monthly" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Monthly")}
            >
              Monthly
            </Button>
            <Button
              className={`togl_btn ${
                activeButton === "Annually" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Annually")}
            >
              Annually
            </Button>
          </div>
          <div className="mt-3">
            <Row className="g-0">
              {activeButton === "Monthly"
                ? data.map((item, index) => {
                    return (
                      <Col
                        className="mb-2"
                        xxl="3"
                        xl="4"
                        lg="6"
                        md="6"
                        sm="6"
                        key={index}
                      >
                        <div className="card fade_card h-100">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between h-100 flex-column">
                              <div>
                                <h5 className="text-center subs_con mt-3">
                                  {item.name}
                                </h5>
                                <div className="d-flex align-items-baseline justify-content-center">
                                  <h5 className="curncy_con">$</h5>
                                  <h5 className="cout_con">
                                    {item.month_rate}
                                  </h5>
                                  <h5 className="month_con">/mo</h5>
                                </div>
                                <p className="subs_con text-center mt-2">
                                  {item.description}
                                </p>
                                <div className="mt-2">
                                  <ul
                                    style={{
                                      listStyle: "none",
                                      paddingLeft: "0px",
                                    }}
                                  >
                                    <li className="mb-1">
                                      <div className="d-flex">
                                        <div className="check_cir">
                                          <img
                                            style={{
                                              width: "9px",
                                              height: "9px",
                                              objectFit: "contain",
                                            }}
                                            src={check}
                                            alt=""
                                          />
                                        </div>
                                        <h4 className="mb-0 subs_li ms-1">
                                          {item.features}
                                        </h4>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-center">
                                <Button className="subsBtn">
                                  UPGRADE SUBSCRIPTION
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                : activeButton === "Annually"
                ? data.map((item, index) => {
                    return (
                      <Col
                        className="mb-2"
                        xxl="3"
                        xl="4"
                        lg="6"
                        md="6"
                        sm="6"
                        key={index}
                      >
                        <div className="card fade_card h-100">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between h-100 flex-column">
                              <div>
                                <h5 className="text-center subs_con mt-3">
                                  {item.name}
                                </h5>
                                <div className="d-flex align-items-baseline justify-content-center">
                                  <h5 className="curncy_con">$</h5>
                                  <h5 className="cout_con">{item.year_rate}</h5>
                                  <h5 className="month_con">/Yearly</h5>
                                </div>
                                <p className="subs_con text-center mt-2">
                                  {item.description}
                                </p>
                                <div className="mt-2">
                                  <ul
                                    style={{
                                      listStyle: "none",
                                      paddingLeft: "0px",
                                    }}
                                  >
                                    <li className="mb-1">
                                      <div className="d-flex">
                                        <div className="check_cir">
                                          <img
                                            style={{
                                              width: "9px",
                                              height: "9px",
                                              objectFit: "contain",
                                            }}
                                            src={check}
                                            alt=""
                                          />
                                        </div>
                                        <h4 className="mb-0 subs_li ms-1">
                                          {item.features}
                                        </h4>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-center">
                                <Button className="subsBtn">
                                  UPGRADE SUBSCRIPTION
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                : null}
            </Row>
          </div>
        </div>
      </>
    </div>
  );
};

export default Subscriptions;
