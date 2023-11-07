import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import "./table.css";
import { Col, Row } from "react-bootstrap";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";
import addEmployee from "../../Admin/assests/add_new_employee.svg";
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
import axios from "axios";

const Employees = () => {
  const [defaultData_, setDefaultData_] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (defaultData_) {
      setName(defaultData_.name);
      setEmail(defaultData_.email);
      setPhone(defaultData_.phone);
      setAddress(defaultData_.address);
      setStatus(defaultData_.status);
    }
  }, [defaultData_]);

  // post req for data

  const postData = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Enter valid email address.");
      return;
    }

    if (!isPhoneValidAustralia(phone)) {
      toast.error("Enter valid Phone address.");
      return;
    }
    if (!isAddressValid(address)) {
      toast.error("Enter valid Address address.");
      return;
    }
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setStatus("");

    axios
      .post(`${global.BASEURL}createRecord/employee`, {
        name,
        email,
        phone,
        address,
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

  //  for get data

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);

  const [selectedOption, setSelectedOption] = useState("All");

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/employee`)
      .then((res) => {
        const data = res.data.data;

        if (selectedOption === "New User") {
          const last5Records = data.slice(0, 3); // Get the last 5 records
          setData(last5Records);
        } else {
          const filteredData = data.filter(
            (item) => item.status === selectedOption || selectedOption === "All"
          );
          setData(filteredData);
        }
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
  }, [selectedOption]);

  // for delet

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
        .post(`${global.BASEURL}deleteRecord/employee`, {
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

  // for update

  const updateData = (e) => {
    e.preventDefault();
    const itemId = defaultData_?._id;
    if (!isEmailValid(email)) {
      toast.error("Enter valid email address.");
      return;
    }

    if (!isPhoneValidAustralia(phone)) {
      toast.error("Enter valid Phone address.");
      return;
    }
    if (!isAddressValid(address)) {
      toast.error("Enter valid Address address.");
      return;
    }
    axios
      .post(`${global.BASEURL}updateRecord/employee`, {
        id: itemId,
        name,
        email,
        phone,
        address,
        status,
      })
      .then(() => {
        employeesEditModal();
        getData();
        toast.success("Data updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  };

  const statuss = [
    { label: "Active", value: "Active" },
    { label: "Un Active", value: "Un Active" },
  ];

  const columns = [
    {
      name: "Sr.no",
      cell: (row, index) => index + 1,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Adress",
      selector: (row) => row.address,
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
              <DropdownMenu end>
                <DropdownItem>
                  <div
                    onClick={() => employeesEditModal(row)}
                    outline
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
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  // Step 2: Add state for managing modal visibility
  const [employeeEditModal, setemployeeEditModal] = useState(false);

  const employeesEditModal = (result) => {
    setDefaultData_(result);
    setemployeeEditModal(!employeeEditModal);
  };

  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  const toggleLargeModal = () => {
    setIsLargeModalOpen(!isLargeModalOpen);
  };

  // validation

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const isAddressValid = (address) => {
    const addressRegex = /^[A-Za-z\s]+$/i;
    return addressRegex.test(address);
  };

  const isPhoneValidAustralia = (phone) => {
    // Regular expression n phone numbers (example: +61 1234567890)
    const phoneRegex = /(?:\+?61)?(?:\(0\)[23478]|\(?0?[23478]\)?)\d{8}/i;
    return phoneRegex.test(phone);
  };

  return (
    <>
      <ToastContainer />

      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">
          Employess / <span style={{ fontSize: "20px" }}>Employess</span>
        </h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" outline onClick={toggleLargeModal}>
              Add Employess
            </Button>

            {/* add client modal  */}
            <Modal
              isOpen={isLargeModalOpen}
              toggle={toggleLargeModal}
              size="lg"
            >
              <ModalHeader toggle={toggleLargeModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img
                    style={{ width: "35px", height: "35px" }}
                    src={addEmployee}
                    alt=""
                  />
                </div>
                <h5 className="modal_title">Add New Employee</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the employee which you want to
                  add.
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
                      <Label className="value_font input_label">Email</Label>
                      <Input
                        onBlur={(e) => {
                          const emailValue = e.target.value;
                          setEmail(emailValue);
                          if (!isEmailValid(emailValue)) {
                            setEmailError(true);
                          } else {
                            setEmailError(false);
                          }
                        }}
                        type="email"
                        placeholder="Email Address"
                      />
                      {emailError && (
                        <div className="error_mssg">Invalid email address</div>
                      )}
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
                      <Label className="value_font input_label">Address</Label>
                      <Input
                        onBlur={(e) => {
                          const addressValue = e.target.value;
                          setAddress(addressValue);
                          if (!isAddressValid(addressValue)) {
                            setAddressError(true);
                          } else {
                            setAddressError(false);
                          }
                        }}
                        type="text"
                        placeholder="Address"
                      />
                      {addressError && (
                        <div className="error_mssg">
                          Invalid address (only letters and spaces allowed)
                        </div>
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
                      Submit
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>

            {/* edit modal */}

            <Modal
              isOpen={employeeEditModal}
              toggle={employeesEditModal}
              size="lg"
            >
              <ModalHeader toggle={employeesEditModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img
                    style={{ width: "35px", height: "35px" }}
                    src={addEmployee}
                    alt=""
                  />
                </div>
                <h5 className="modal_title">Edit New Employee</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the employee which you want to
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
                      <Label className="value_font input_label">Email</Label>
                      <Input
                        onBlur={(e) => {
                          const emailValue = e.target.value;
                          setEmail(emailValue);
                          if (!isEmailValid(emailValue)) {
                            setEmailError(true);
                          } else {
                            setEmailError(false);
                          }
                        }}
                        defaultValue={defaultData_?.email}
                        type="email"
                        placeholder="Email Address"
                      />
                      {emailError && (
                        <div className="error_mssg">Invalid email address</div>
                      )}
                    </Col>

                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Phone Number
                      </Label>
                      <Input
                        onBlur={(e) => {
                          const emailValue = e.target.value;
                          setEmail(emailValue);
                          if (!isEmailValid(emailValue)) {
                            setEmailError(true);
                          } else {
                            setEmailError(false);
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
                      <Label className="value_font input_label">Address</Label>
                      <Input
                        onBlur={(e) => {
                          const addressValue = e.target.value;
                          setAddress(addressValue);
                          if (!isAddressValid(addressValue)) {
                            setAddressError(true);
                          } else {
                            setAddressError(false);
                          }
                        }}
                        defaultValue={defaultData_?.address}
                        type="text"
                        placeholder="Address"
                      />
                      {addressError && (
                        <div className="error_mssg">
                          Invalid address (only letters and spaces allowed)
                        </div>
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
                      Submit
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
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedOption("All");
                  }}
                >
                  All
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedOption("New User");
                  }}
                >
                  New User
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedOption("Active");
                  }}
                >
                  Active User
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedOption("Un Active");
                  }}
                >
                  Un Active
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
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

export default Employees;
