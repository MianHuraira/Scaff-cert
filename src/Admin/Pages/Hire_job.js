import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import "./table.css";
import active from "../../Admin/assests/icons/active.png";

import { NavLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MoreHorizontal, Trash, Edit2 } from "react-feather";
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

import axios from "axios";

const completed_icon = {
  width: "11px",
  height: "11px",
  backgroundColor: "#696CFF", // Use backgroundColor instead of background
  borderRadius: "50%",
  marginRight: "10px",
};

const JobHire = () => {
  const [isLoading, setIsLoading] = useState(true);

  // show data start code
  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/jobs`)
      .then((res) => {
        const resp = res.data.data;
        const filterData = resp.filter((item) => item.day_hire === "true");
        setData(filterData);
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

  const columns = [
    {
      name: "Sr.no",
      selector: (row, index) => index + 1,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Job Number",
      selector: (row) => row.job_no,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Job Name",
      selector: (row) => row.job_name,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Job Type",
      selector: (row) => row.day_hire === "true" ? (<span>Dry Hire Job</span>):"",
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
              <div style={completed_icon}></div>
              <span>{row.status}</span>
            </>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      allowOverflow: true,
      maxWidth: "7rem",
      minWidth: "2rem",
      cell: (row) => {
        // modal edit
        const id = row._id;

        return (
          <div className="d-flex justify-content-end w-100">
            <UncontrolledDropdown>
              <DropdownToggle className="pe-1" tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu className="scrolDrop" end>
                <DropdownItem>
                  <NavLink
                    to={`/job_detail/${id}`}
                    className="btn btn-white w-100 p-0 m-0"
                  >
                    <span className="align-middle ms-50">Views</span>
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  // edit client modal start

  // Step 2: Add state for managing modal visibility
  const [branchEdit, setbranchEdit] = useState(false);

  const editModalBranch = () => {
    setbranchEdit(!branchEdit);
  };

  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  const toggleLargeModal = () => {
    setIsLargeModalOpen(!isLargeModalOpen);
  };

  return (
    <>
      <h5 className="head_title  mt-3 mb-3">Dry Hire Job</h5>
      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">List of Dry Hire Jobs</h5>
        <input
          style={{ width: "fit-content" }}
          className="form-control"
          placeholder="Search"
          type="search"
        />
      </div>
      {/* table start */}
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

export default JobHire;
