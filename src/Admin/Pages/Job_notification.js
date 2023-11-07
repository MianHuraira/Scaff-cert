import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
import "./table.css";
// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import active from "../../Admin/assests/icons/active.png";
import axios from "axios";
import cube from "../../Admin/assests/cube.svg";
import mini_truck from "../../Admin/assests/mini-truck.svg";
import mini_full from "../../Admin/assests/mini-full.svg";
import "./table.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";
const iconS = {
  width: "16px",
  height: "16px",
};
const JobNotification = () => {
  const location = useLocation();
  const { totalQuantity, totalWeightSum } = location.state || {};

  console.log("qun", totalQuantity);

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // show data start code
  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/jobs`)
      .then((res) => {
        const matchedData = res.data.data.filter((item) => item._id === id);
        setData(matchedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [id]);

  const columns = [
    {
      name: "Job Number",
      cell: (row) => row.job_no,
      sortable: true,
      maxWidth: "7rem",
      minWidth: "2rem",
    },
    {
      name: "Job Name",
      cell: (row) => row.job_name,
      sortable: true,
    },
    {
      name: "Branch",
      cell: (row) => row.branch,
      sortable: true,
    },
    {
      name: "Total Qty",
      cell: (row) => totalQuantity,
      sortable: true,
    },
    {
      name: "Total Weight(kg)",
      cell: (row) => totalWeightSum,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row.status === "Move to Picklist" ? (
            <>
              <h5>Move to Picklist</h5>
            </>
          ) : row.status === "Create Delivery Docket" ? (
            <>
              <h5>Create Delivery Docket</h5>
            </>
          ) : row.status === "Delivery Succesfully" ? (
            <>
              <h5>Delivery Succesfully</h5>
            </>
          ) : row.status === "Item(s) successfully Returned" ? (
            <h5>Item(s) successfully Returned</h5>
          ) : (
            ""
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          {row.status === "Move to Picklist" ? (
            <>
              <Link to={`/job_add/${row._id}?tabKey=cube`}>
                <img
                  src={cube}
                  alt="active"
                  style={iconS}
                  className="me-1 mb-1"
                />
              </Link>
            </>
          ) : row.status === "Create Delivery Docket" ? (
            <>
              <Link to={`/job_add/${row._id}?tabKey=deli`}>
                <img
                  src={mini_truck}
                  alt="active"
                  style={iconS}
                  className="me-1 mb-1"
                />
              </Link>
            </>
          ) : row.status === "Delivery Succesfully" ? (
            <>
              <Link to={`/job_add/${row._id}?tabKey=ret`}>
                <img
                  src={mini_full}
                  alt="active"
                  style={iconS}
                  className="me-1 mb-1"
                />
              </Link>
              <Link to={`/job_add/${row._id}?tabKey=cube`}>
                <img
                  src={cube}
                  alt="active"
                  style={iconS}
                  className="me-1 mb-1"
                />
              </Link>
            </>
          ) : row.status === "Item(s) successfully Returned" ? (
            <>
              {/* <Link to={`/job_add/${row._id}?tabKey=comRet`}> */}
              <img
                src={mini_full}
                alt="active"
                style={iconS}
                className="me-1 mb-1"
              />
              {/* </Link> */}
            </>
          ) : (
            ""
          )}
        </>
      ),
      allowOverflow: true,
      maxWidth: "7rem",
      minWidth: "2rem",
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">Notification</h5>
      </div>
      {/* data satrt */}

      <div>
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
        ) : data.length === 0 ? (
          <p>There is no data to show.</p>
        ) : (
          <ClientDataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
};

export default JobNotification;
