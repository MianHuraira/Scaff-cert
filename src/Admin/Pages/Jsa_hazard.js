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
import jsaHazard from "../../Admin/assests/add_JSA_hazards.svg";

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

const JsaHazard = () => {
  const [defaultData_, setDefaultData_] = useState("");

  // states for update and insert data

  const [name, setName] = useState("");

  useEffect(() => {
    if (defaultData_) {
      setName(defaultData_.name);
    }
  }, [defaultData_]);

  // post data

  const postData = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setName("");

    axios
      .post(`${global.BASEURL}createRecord/jsahazards`, {
        name,
      })
      .then(() => {
        toggleLargeModal();
        getData();
        toast.success("Data added successfully.");
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
        toast.error("Failed to add data."); // Show error toast
      });
  };

  // get data

  const [isLoading, setIsLoading] = useState(true);

  // show data start code
  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/jsahazards`)
      .then((res) => {
        setData(res.data.data);
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

  // update data

  const updateData = (e) => {
    e.preventDefault();
    const itemId = defaultData_?._id;
    axios
      .post(`${global.BASEURL}updateRecord/jsahazards`, {
        id: itemId,
        name,
      })
      .then(() => {
        editHazard();
        getData();
        toast.success("Data updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  };

  // delet data

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);

    // Delete the item
    if (deleteItemId) {
      axios
        .post(`${global.BASEURL}deleteRecord/jsahazards`, {
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

  let counter = 0;
  const columns = [
    {
      name: "Sr.no",
      selector: (row) => ++counter,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Name",
      selector: (row) => row.name,
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
                    onClick={() => editHazard(row)}
                    className="btn w-100 btn-white p-0 m-0"
                  >
                    <span className="align-middle ms-50">Edit</span>
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div
                    onClick={() => handleDelete(row._id)}
                    className="btn w-100 btn-white p-0 m-0"
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

  // edit client modal start

  // Step 2: Add state for managing modal visibility
  const [hazardmodal, sethazardmodal] = useState(false);

  const editHazard = (result) => {
    setDefaultData_(result);
    sethazardmodal(!hazardmodal);
  };

  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  const toggleLargeModal = () => {
    setIsLargeModalOpen(!isLargeModalOpen);
  };

  return (
    <>
      <ToastContainer />

      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">
          {" "}
          Forms / <span style={{ fontSize: "20px" }}> Jsa hazards</span>
        </h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" outline onClick={toggleLargeModal}>
              Add JSA Hazards
            </Button>

            {/* add hazard modal */}
            <Modal
              centered
              isOpen={isLargeModalOpen}
              toggle={toggleLargeModal}
              size="md"
            >
              <ModalHeader toggle={toggleLargeModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img
                    style={{ width: "35px", height: "35px" }}
                    src={jsaHazard}
                    alt=""
                  />
                </div>
                <h5 className="modal_title">Add New JSA Hazards</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the form which you want to add.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="12" md="12">
                      <Label className="value_font input_label">
                        Add New JSA Hazards
                      </Label>

                      <Input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Col>
                  </Row>
                  <div className="mx-auto">
                    <Button
                      onClick={postData}
                      type="submit"
                      className="mt-2 default_btn"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>

            {/* edit modal */}

            <Modal centered isOpen={hazardmodal} toggle={editHazard} size="md">
              <ModalHeader toggle={editHazard}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img
                    style={{ width: "35px", height: "35px" }}
                    src={jsaHazard}
                    alt=""
                  />
                </div>
                <h5 className="modal_title">Edit New JSA Hazards</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the form which you want to edit.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="12" md="12">
                      <Label className="value_font input_label">
                        Add New JSA Hazards
                      </Label>

                      <Input
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={defaultData_?.name}
                        type="text"
                        placeholder="Risk Control"
                      />
                    </Col>
                  </Row>
                  <div className="mx-auto">
                    <Button
                      onClick={updateData}
                      type="submit"
                      className="mt-2 default_btn"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>
            {/* delete modal */}

            <Modal isOpen={isDeleteModalOpen} size="md">
              <ModalHeader>Delete Confirmation</ModalHeader>
              <ModalBody>Are you sure you want to delete this item?</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => handleDeleteConfirm(deleteItemId)}
                >
                  Yes
                </Button>
                <Button
                  color="secondary"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  No
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="ms-2">
            <UncontrolledButtonDropdown>
              <DropdownToggle className="filter_btn">
                <img className="filter_img" src="./icons/filter_icon.png" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  href="/"
                  tag="a"
                  onClick={(e) => e.preventDefault()}
                >
                  All
                </DropdownItem>
                <DropdownItem
                  href="/"
                  tag="a"
                  onClick={(e) => e.preventDefault()}
                >
                  New User
                </DropdownItem>
                <DropdownItem
                  href="/"
                  tag="a"
                  onClick={(e) => e.preventDefault()}
                >
                  Active User
                </DropdownItem>
                <DropdownItem
                  href="/"
                  tag="a"
                  onClick={(e) => e.preventDefault()}
                >
                  Blocked User
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
      </div>

      {/* table  */}
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

export default JsaHazard;
