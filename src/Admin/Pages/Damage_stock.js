import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
import "./table.css";
// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React from "react";
import "./table.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Damage_stock = () => {
  let data = [
    {
      srno: "09",
      item_name: "Atif",
      qty: "1",
      job_no: "223",
      branch: "test",
    },
  ];
  const columns = [
    {
      name: "Sr.no",
      cell: (row, index) => index + 1,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Item Name",
      selector: (row) => row.item_name,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Job Number",
      selector: (row) => row.job_no,
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

  return (
    <>
      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">Damage Stock</h5>
        <div className="d-flex align-items-center"></div>
      </div>
      {/* data satrt */}
      <div>
        <ClientDataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Damage_stock;
