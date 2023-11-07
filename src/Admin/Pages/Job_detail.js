import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
import "./table.css";

import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { Fragment, useEffect, useState } from "react";
import "./table.css";
import { Col, Row } from "react-bootstrap";
import code_Qr from "../../Admin/assests/qr-code2.png";
import reportIcon from "../../Admin/assests/icons/report_icon.png";
import inspecPhoto from "../../Admin/assests/inspecPhoto.png";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Spinerr from "../../views/components/spinners/SpinnerGrowing";
import axios from "axios";

import {
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { MoreHorizontal, Trash, Edit2 } from "react-feather";
import { Button } from "reactstrap";
import { log } from "@craco/craco/lib/logger";

const iconSize = {
  width: "20px",
  height: "20px",
};

const inspe_photo = {
  width: "85px",
  height: "85px",
  borderRadius: "8px",
};

const JobDetail = () => {
  // get
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const [dataRow, setDataRow] = useState({});

  function getData(id) {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/jobs`)
      .then((res) => {
        const matchedData = res.data.data.find((item) => item._id === id);
        setDataRow(matchedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getData(id);
  }, [id]);

  let data = [
    {
      srno: "09",
      job_no: "7003",
      inpsection_date: "27-03-2023",
      rep: "Max Well",
      inspection_report: (
        <>
          <img style={iconSize} src={reportIcon} alt="" />
        </>
      ),
      photo: (
        <div>
          <img style={inspe_photo} src={inspecPhoto} alt="" />
        </div>
      ),
    },
  ];

  const columns = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Job Number",
      selector: (row) => row.job_no,
      sortable: "true",
      // maxWidth: "2rem",
    },
    {
      name: "Inspection Date",
      selector: (row) => row.inpsection_date,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Rep",
      selector: (row) => row.rep,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Inspection Report",
      selector: (row) => row.inspection_report,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Photo",
      selector: (row) => row.photo,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Action",
      allowOverflow: true,
      maxWidth: "7rem",
      minWidth: "2rem",
      cell: () => {
        // modal edit

        return (
          <div className="d-flex justify-content-center w-100">
            <UncontrolledDropdown className="">
              <DropdownToggle className="pe-1 " tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <div className="btn btn-white w-100 p-0 m-0">
                    <span className="align-middle ms-50">Edit</span>
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div className="btn btn-white w-100 p-0 m-0">
                    <span className="align-middle ms-50">Delete</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  // tabel secound data satrt
  let data2 = [
    {
      srno: "09",
      ass_rep: "7003",
      per_req: "Lorem",
      ppp_req: "Lorem",
      employee: "Max Well",
    },
  ];

  const columns2 = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Assigned Rep",
      selector: (row) => row.ass_rep,
      sortable: "true",
      // maxWidth: "2rem",
    },
    {
      name: "Permits Required",
      selector: (row) => row.per_req,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "P.P.E Required",
      selector: (row) => row.ppp_req,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Employee",
      selector: (row) => row.employee,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Action",
      allowOverflow: true,
      maxWidth: "7rem",
      minWidth: "2rem",
      cell: () => {
        // modal edit

        return (
          <div className="d-flex justify-content-center w-100">
            <UncontrolledDropdown className="">
              <DropdownToggle className="pe-1 " tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <div className="btn btn-white w-100 p-0 m-0">
                    <span className="align-middle ms-50">Edit</span>
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div className="btn btn-white w-100 p-0 m-0">
                    <span className="align-middle ms-50">Delete</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  // tabel therd data satrt
  let data3 = [
    {
      srno: "09",
      inventory_name: "Standard 3.0m",
      qty: "1",
      total_weight: "18",
      employee: "Max Well",
    },
  ];

  const columns3 = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Inventroy Name",
      selector: (row) => row.inventory_name,
      sortable: "true",
      // maxWidth: "2rem",
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Total Weight()Kg",
      selector: (row) => row.total_weight,
      sortable: "true",
      // maxWidth:"6rem"
    },
  ];

  // tabel fourth data satrt
  let data4 = [
    {
      srno: "09",
      delivery_id: "DEL-1188",
      job_number: "50600",
      date: "18-03-2023",
      rep: "Non",
      photo: (
        <div>
          <img style={inspe_photo} src={inspecPhoto} alt="" />
        </div>
      ),
    },
  ];

  const columns4 = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Delivery ID",
      selector: (row) => row.delivery_id,
      sortable: "true",
      // maxWidth: "2rem",
    },
    {
      name: "Job Number",
      selector: (row) => row.job_number,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Rep",
      selector: (row) => row.rep,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Photo",
      selector: (row) => row.photo,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Action",
      allowOverflow: true,
      maxWidth: "7rem",
      minWidth: "2rem",
      cell: () => {
        // modal edit

        return (
          <div className="d-flex justify-content-center w-100">
            <UncontrolledDropdown className="">
              <DropdownToggle className="pe-1 " tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <div className="btn btn-white w-100 p-0 m-0">
                    <span className="align-middle ms-50">Edit</span>
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div className="btn btn-white w-100 p-0 m-0">
                    <span className="align-middle ms-50">Delete</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];
  // tabel fiver data satrt
  let data5 = [
    {
      srno: "09",
      item_name: "DEL-1188",
      qty: "19",
      weight: "18",
      job: "Non",
      branch: "Branch",
    },
  ];

  const columns5 = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Item Name",
      selector: (row) => row.item_name,
      sortable: "true",
      // maxWidth: "2rem",
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Weight",
      selector: (row) => row.weight,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Job",
      selector: (row) => row.job,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
      sortable: "true",
      // maxWidth:"6rem"
    },
  ];

  const [activeTabSection1, setActiveTabSection1] = useState("1");

  const toggleTabSection1 = (tab) => {
    if (activeTabSection1 !== tab) {
      setActiveTabSection1(tab);
    }
  };
  // edit client modal start

  // end

  const codeStyle = {
    width: "200px",
    height: "200px",
  };

  return (
    <>
      <div className="flex_space mt-3 mb-3">
        <h5 className="head_title"> Job Number: {dataRow.job_no}</h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn">Edit Job</Button>
          </div>
          <div className="ms-2">
            <Button className="default_btn">Add New Job</Button>
          </div>
        </div>
      </div>

      <Fragment>
        <Nav tabs justified>
          <NavItem>
            <NavLink
              className={activeTabSection1 === "1" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("1");
              }}
            >
              Job Info
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabSection1 === "2" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("2");
              }}
            >
              Inspection
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabSection1 === "3" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("3");
              }}
            >
              JSA
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabSection1 === "4" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("4");
              }}
            >
              Job Inventory Items
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabSection1 === "5" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("5");
              }}
            >
              Delivery/Return Docket
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabSection1 === "6" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("6");
              }}
            >
              Adjustment Docket
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="py-50" activeTab={activeTabSection1}>
          {/* Job Info tab */}
          <TabPane tabId="1">
            <div className="table_main p-1">
              <h4 className="head_title ms-2 mb-1">Job Information</h4>
              <div className="card">
                <div className="card-body">
                  {isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <Spinerr />
                    </div>
                  ) : dataRow.length === 0 ? (
                    <p>There is no data to show.</p>
                  ) : (
                    <Row className="mt-2">
                      <Col lg="6" md="6" sm="6">
                        <Row className="mb-2">
                          <Col lg="6">
                            <h5 className="job_cont">Job Number:</h5>
                          </Col>
                          <Col lg="6">
                            <h5 className="job_cont">{dataRow.job_no}</h5>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg="6">
                            <h5 className="job_cont">Job Name:</h5>
                          </Col>
                          <Col lg="6">
                            <h5 className="job_cont">{dataRow.job_name}</h5>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg="6">
                            <h5 className="job_cont">Client Name:</h5>
                          </Col>
                          <Col lg="6">
                            <h5 className="job_cont">{dataRow.client}</h5>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg="6">
                            <h5 className="job_cont">Assigned Group:</h5>
                          </Col>
                          <Col lg="6">
                            <h5 className="job_cont">{dataRow.group}</h5>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg="6">
                            <h5 className="job_cont">Job Address:</h5>
                          </Col>
                          <Col lg="6">
                            <h5 className="job_cont">{dataRow.job_address}</h5>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg="6">
                            <h5 className="job_cont">Descripton:</h5>
                          </Col>
                          <Col lg="6">
                            <h5 className="job_cont">{dataRow.description}</h5>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg="6">
                            <h5 className="job_cont">Load Rating:</h5>
                          </Col>
                          <Col lg="6">
                            <h5 className="job_cont">{dataRow.load_rating}</h5>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg="6">
                            <h5 className="job_cont">Drawing Number:</h5>
                          </Col>
                          <Col lg="6">
                            <h5 className="job_cont">
                              {dataRow.drawing_numbers}
                            </h5>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col lg="6">
                            <h5 className="job_cont">Intended Purpose:</h5>
                          </Col>
                          <Col lg="6">
                            <h5 className="job_cont">{dataRow.purpose}</h5>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="6" md="6" sm="6">
                        <div style={{ float: "right" }}>
                          <img style={codeStyle} src={code_Qr} alt="" />
                        </div>
                      </Col>
                    </Row>
                  )}
                </div>
              </div>
            </div>
          </TabPane>
          {/* Inspection tab */}
          <TabPane  tabId="2">
            <div className="flex_space mt-3 mb-3">
              <h4 className="head_title ms-2 mb-1">Job Inspection</h4>
              <input
                style={{ width: "fit-content" }}
                className="form-control"
                placeholder="Search...."
                type="search"
              />
            </div>
            <div className="table_main p-1 mt-2 pb-3">
              <ClientDataTable columns={columns} data={data} />
            </div>
          </TabPane>
          {/* JSA tab */}
          <TabPane tabId="3">
            <div className="flex_space mt-3 mb-3">
              <h4 className="head_title ms-2 mb-1">JSA</h4>
            </div>
            <div className="table_main p-1 mt-2 pb-3">
              <ClientDataTable columns={columns2} data={data2} />
            </div>
          </TabPane>
          {/* Job Inventory Items tab */}
          <TabPane tabId="4">
            <div className="flex_space mt-3 mb-3">
              <h4 className="head_title ms-2 mb-1">Job Inventory Items</h4>
              <input
                placeholder="Search..."
                style={{ width: "fit-content" }}
                className="form-control"
                type="search"
              />
            </div>
            <div className="table_main p-1 mt-2 pb-3">
              <ClientDataTable columns={columns3} data={data3} />
            </div>
          </TabPane>
          {/* Delivery/Return Docket tab */}
          <TabPane tabId="5">
            <div className="flex_space mt-3 mb-3">
              <h4 className="head_title ms-2 mb-1">Delivery Docket</h4>
              <input
                placeholder="Search..."
                style={{ width: "fit-content" }}
                className="form-control"
                type="search"
              />
            </div>
            <div className="table_main p-1 mt-2 pb-3">
              <ClientDataTable columns={columns4} data={data4} />
            </div>

            {/* section secund */}

            <div className="flex_space mt-3 mb-3">
              <h4 className="head_title ms-2 mb-1">Inventory Items</h4>
              <input
                placeholder="Search..."
                style={{ width: "fit-content" }}
                className="form-control"
                type="search"
              />
            </div>
            <div className="table_main p-1 mt-2 pb-3">
              <ClientDataTable columns={columns4} data={data4} />
            </div>
          </TabPane>
          {/* Adjustment Docket tab */}
          <TabPane tabId="6">
            <div className="flex_space mt-3 mb-3">
              <h4 className="head_title ms-2 mb-1">Adjustment Docket</h4>
              <input
                placeholder="Search..."
                style={{ width: "fit-content" }}
                className="form-control"
                type="search"
              />
            </div>
            <div className="table_main p-1 mt-2 pb-3">
              <ClientDataTable columns={columns5} data={data5} />
            </div>
          </TabPane>
        </TabContent>

        {/* secound tab start */}
      </Fragment>
    </>
  );
};

export default JobDetail;
