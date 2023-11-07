import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
import "./table.css";
// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import "./table.css";
import { Col, Row } from "react-bootstrap";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";
import branches2 from "../../Admin/assests/side_icon/branches2.png";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { MoreHorizontal } from "react-feather";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

const Branches = () => {
  const [defaultData_, setDefaultData_] = useState("");

  const [name, setName] = useState("");
  const [branch_code, setBranch_code] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (defaultData_) {
      setName(defaultData_.name);
      setBranch_code(defaultData_.branch_code);
      setLocation(defaultData_.location);
      setPhone(defaultData_.phone);
      setStatus(defaultData_.status);
    }
  }, [defaultData_]);

  // post data

  const postData = (e) => {
    e.preventDefault();

    if (!name || !branch_code || !location || !phone) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (!isPhoneValidAustralia(phone)) {
      toast.error("Enter valid Phone address.");
      return;
    }
    setName("");
    setBranch_code("");
    setLocation("");
    setPhone("");
    setStatus("");

    axios
      .post(`${global.BASEURL}createBranch`, {
        name,
        branch_code,
        location,
        phone,
        status,
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

  // DATA GET

  // for spiner to get data

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getBranches`)
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

  // delet data

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
        .post(`${global.BASEURL}deleteBranch`, {
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

  // update data

  const updateData = (e) => {
    e.preventDefault();
    const itemId = defaultData_?._id;

    if (!isPhoneValidAustralia(phone)) {
      toast.error("Enter valid Phone address.");
      return;
    }
    axios
      .post(`${global.BASEURL}updateBranch`, {
        id: itemId,
        name,
        branch_code,
        location,
        phone,
        status,
      })
      .then(() => {
        editModalBranch();
        getData();
        toast.success("Data updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  };

  const columns = [
    {
      name: "Sr.no",
      cell: (row, index) => index + 1,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Branch Name",
      selector: (row) => row.name,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Branch Code",
      selector: (row) => row.branch_code,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Location",
      selector: (row) => row.location,
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
              <DropdownMenu className="scrolDrop" end>
                <DropdownItem>
                  <div
                    onClick={() => editModalBranch(row)}
                    className="btn btn-white w-100 p-0 m-0"
                  >
                    <span className="align-middle ms-50">Edit</span>
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div
                    onClick={() => handleDelete(row._id)}
                    className="btn btn-white w-100 p-0 m-0"
                  >
                    <span className="align-middle ms-50">Delete</span>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <Link
                    to={{
                      pathname: "/branch_inventory",
                      search: `?bN=${row.name}`,
                    }}
                  >
                    <div className="btn btn-white w-100 p-0 m-0">
                      <span className="align-middle ms-50">Inventory</span>
                    </div>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to={"/damage_stock"}>
                    <div className="btn btn-white w-100 p-0 m-0">
                      <span className="align-middle ms-50">Damage Stock</span>
                    </div>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  // edit client modal start

  // end

  // Step 2: Add state for managing modal visibility
  const [branchEdit, setbranchEdit] = useState(false);

  const editModalBranch = (result) => {
    setDefaultData_(result);
    setbranchEdit(!branchEdit);
  };

  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const toggleLargeModal = () => {
    setIsLargeModalOpen(!isLargeModalOpen);
  };

  const statuss = [
    { label: "Active", value: "Active" },
    { label: "Un Active", value: "Un Active" },
  ];

  //  phone validation
  const [phoneError, setPhoneError] = useState(false);
  const isPhoneValidAustralia = (phone) => {
    // Regular expression for Australian phone numbers (example: +61 1234567890)
    const phoneRegex = /(?:\+?61)?(?:\(0\)[23478]|\(?0?[23478]\)?)\d{8}/i;
    return phoneRegex.test(phone);
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">
          Branch / <span style={{ fontSize: "20px" }}>Branches</span>
        </h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" onClick={toggleLargeModal}>
              Add New Branch
            </Button>

            {/* add branches modal */}
            <Modal
              isOpen={isLargeModalOpen}
              toggle={toggleLargeModal}
              size="lg"
            >
              <ModalHeader toggle={toggleLargeModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img className="icon_sizee" src={branches2} alt="" />
                </div>
                <h5 className="modal_title">Add New Branch</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the branch which you want to add.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Name</Label>
                      <Input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Branch Code
                      </Label>
                      <Input
                        onChange={(e) => setBranch_code(e.target.value)}
                        type="number"
                        placeholder="Branch Code"
                      />
                    </Col>

                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Location</Label>
                      <Input
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        placeholder="Location"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Phone Number
                      </Label>
                      <Input
                        onBlur={(e) => {
                          const phoneValue = e.target.value;
                          setPhone(phoneValue);
                          if (!isPhoneValidAustralia(phoneValue)) {
                            setPhoneError(true);
                          } else {
                            setPhoneError(false);
                          }
                        }}
                        type="tel"
                        placeholder="Phone Number"
                      />
                      {phoneError && (
                        <div className="error_mssg">Invalid phone number</div>
                      )}
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Status</Label>
                      <Select
                        onChange={(selectedOption) =>
                          setStatus(selectedOption.value)
                        }
                        isClearable={false}
                        classNamePrefix="select"
                        options={statuss}
                      />
                    </Col>
                  </Row>
                  <div className="mx-auto">
                    <Button
                      onClick={postData}
                      type="submit"
                      className="mt-2 default_btn"
                    >
                      Add Branch
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>

            {/* edit modal */}

            <Modal isOpen={branchEdit} toggle={editModalBranch} size="lg">
              <ModalHeader toggle={editModalBranch}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img className="icon_sizee" src={branches2} alt="" />
                </div>
                <h5 className="modal_title">Edit New Branch</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the branch which you want to
                  edit.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Name</Label>
                      <Input
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={defaultData_?.name}
                        type="text"
                        placeholder="Name"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Branch Code
                      </Label>
                      <Input
                        onChange={(e) => setBranch_code(e.target.value)}
                        defaultValue={defaultData_?.branch_code}
                        type="number"
                        placeholder="Branch Code"
                      />
                    </Col>

                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Location</Label>
                      <Input
                        onChange={(e) => setLocation(e.target.value)}
                        defaultValue={defaultData_?.location}
                        type="text"
                        placeholder="Location"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Phone Number
                      </Label>
                      <Input
                        onBlur={(e) => {
                          const phoneValue = e.target.value;
                          setPhone(phoneValue);
                          if (!isPhoneValidAustralia(phoneValue)) {
                            setPhoneError(true);
                          } else {
                            setPhoneError(false);
                          }
                        }}
                        defaultValue={defaultData_?.phone}
                        type="tel"
                        placeholder="Phone Number"
                      />
                      {phoneError && (
                        <div className="error_mssg">Invalid phone number</div>
                      )}
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Status</Label>
                      <Select
                        onChange={(selectedOption) =>
                          setStatus(selectedOption.value)
                        }
                        value={statuss.find(
                          (option) => option.value === status
                        )}
                        isClearable={false}
                        classNamePrefix="select"
                        options={statuss}
                      />
                    </Col>
                  </Row>
                  <div className="mx-auto">
                    <Button
                      onClick={updateData}
                      type="submit"
                      className="mt-2 default_btn"
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>

            {/* delet modal */}

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

export default Branches;
