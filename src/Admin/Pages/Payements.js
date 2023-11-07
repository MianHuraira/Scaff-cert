import React from "react";
import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
import './table.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";

const Payements = () => {
  let data = [
    {
      srno: "09",
      username: "Atif",
      productname: "Bussiness",
      transectionid: "wer456rt89uhi67",
      payment: "500.00",
      currency: "USD",
      email: "tes@gmail.ocm",
      status: "Completed",
    },
    {
      srno: "09",
      username: "Atif",
      productname: "Bussiness",
      transectionid: "wer456rt89uhi67",
      payment: "500.00",
      currency: "USD",
      email: "tes@gmail.ocm",
      status: "Block",
    },
  ];

  const columns = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "User Nmae",
      selector: (row) => row.username,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Product Name",
      selector: (row) => row.productname,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Transection ID",
      selector: (row) => row.transectionid,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Payment Gross",
      selector: (row) => row.payment,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Currency Code",
      cell: (row) => row.currency,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Email Adress",
      cell: (row) => row.email,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="d-flex align-items-center">
          {row.status === "Completed" ? (
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
  return (
    <>
      <div className="mt-3 mb-3">
        <h5 className="head_title">Payements</h5>
      </div>
      <div className="d-flex align-align-items-center justify-content-between mt-2">
        <h5 className="head_title">List of Payments</h5>
        <input
          type="search"
          placeholder="Search"
          className="form-control"
          style={{ width: "fit-content" }}
        />
      </div>
      <div className="table_main p-1 mt-1 pb-3">
        <ClientDataTable columns={columns} data={data} />
        <div className="mt-2">
          <span>Showing 3 out of 3 entries</span>
        </div>
      </div>
    </>
  );
};

export default Payements;
