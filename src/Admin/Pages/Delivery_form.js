import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import "./table.css";
import Select from "react-select";
import { Breadcrumb, Card, Col, Row, Spinner } from "react-bootstrap";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";
import userIcon from "../../Admin/assests/client_icon_modal.png";

import { Link } from "react-router-dom";
import {
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Label,
} from "reactstrap";
import { MoreHorizontal, Trash, Edit2 } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

const DeliveryFrom = () => {
  const [isLoading, setIsLoading] = useState(true);

  // show data start code
  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/jobs`)
      .then((res) => {
        const resp = res.data.data;
        const respDate = resp.filter(
          (item) => item.status === "Create Delivery Docket"
        );

        setData(respDate);
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

  // delet api
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  function handleDelete(id) {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  }

  const handleDeleteConfirm = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);

    // Delete the item
    if (deleteItemId) {
      axios
        .post(`${global.BASEURL}deleteRecord/jobs`, {
          id: deleteItemId,
        })
        .then(() => {
          getData();
          toast.success("Data deleted successfully."); // Show success toast
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          toast.error("Failed to delete data."); // Show error toast
        });
    }
  };

  const columns = [
    {
      name: "Sr.no",
      selector: (row, index) => index + 1,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Form ID",
      selector: (row) => row.fomr_id,
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
      name: "Job Name",
      selector: (row) => row.job_name,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Date",
      selector: (row) => "12/2/1999",
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Delivered By",
      selector: (row) => row.client,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Action",
      allowOverflow: true,
      maxWidth: "7rem",
      minWidth: "2rem",
      cell: (row) => {
        // modal edit

        return (
          <div className="d-flex justify-content-end w-100">
            <UncontrolledDropdown className="">
              <DropdownToggle className="pe-1 " tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <div
                    onClick={() => handleDelete(row._id)}
                    className="btn btn-white w-100 p-0 m-0"
                  >
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

  return (
    <>
      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">
          Forms / <span style={{ fontSize: "20px" }}>Delivery Report</span>
        </h5>
      </div>

      {/* delet modal  */}

      <Modal isOpen={isDeleteModalOpen}>
        <ModalHeader>Delete Confirmation</ModalHeader>
        <ModalBody>Are you sure you want to delete this item?</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => handleDeleteConfirm(deleteItemId)}
          >
            Yes
          </Button>
          <Button color="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            No
          </Button>
        </ModalFooter>
      </Modal>
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

export default DeliveryFrom;
