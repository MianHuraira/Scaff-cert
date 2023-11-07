import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import "./table.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";
import addReps from "../../Admin/assests/add_new_rep.svg";
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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

import countriesData from "./countries.json";

const RepsPage = () => {

  const [defaultData_, setDefaultData_] = useState("");
  // states for update and insert data

  const [timezone, setTimezone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [branch, setBranch] = useState("");
  const [priviliges_inspection, setPriviliges_inspection] = useState("");
  const [priviliges_delivery, setPriviliges_delivery] = useState("");
  const [priviliges_equipment, setPriviliges_equipment] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (defaultData_) {
      setTimezone(defaultData_.timezone);
      setName(defaultData_.name);
      setEmail(defaultData_.email);
      setPassword(defaultData_.password);
      setAddress(defaultData_.address);
      setPhone(defaultData_.phone);
      setCity(defaultData_.city);
      setState(defaultData_.state);
      setZipcode(defaultData_.zipcode);
      setCountry(defaultData_.country);
      setBranch(defaultData_.branch);
      setPriviliges_inspection(defaultData_.priviliges_inspection);
      setPriviliges_delivery(defaultData_.priviliges_delivery);
      setPriviliges_equipment(defaultData_.priviliges_equipment);
      setStatus(defaultData_.status);
    }
  }, [defaultData_]);

  // add data

  const postData = (e) => {
    e.preventDefault();
    if (
      !timezone ||
      !name ||
      !email ||
      !password ||
      !address ||
      !phone ||
      !city ||
      !state ||
      !zipcode ||
      !country ||
      !branch ||
      !priviliges_inspection ||
      !priviliges_delivery ||
      !priviliges_equipment
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setTimezone("");
    setName("");
    setEmail("");
    setPassword("");
    setAddress("");
    setPhone("");
    setCity("");
    setState("");
    setZipcode("");
    setCountry("");
    setBranch("");
    setPriviliges_inspection("");
    setPriviliges_delivery("");
    setPriviliges_equipment("");
    // setStatus("");

    axios
      .post(`${global.BASEURL}createRecord/rep`, {
        timezone,
        name,
        email,
        password,
        address,
        phone,
        city,
        state,
        zipcode,
        country,
        branch,
        priviliges_inspection,
        priviliges_delivery,
        priviliges_equipment,
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

  // get data

  const [isLoading, setIsLoading] = useState(true);

  // show data start code
  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/rep`)
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
      .post(`${global.BASEURL}updateRecord/rep`, {
        id: itemId,
        name,
        email,
        timezone,
        password,
        address,
        phone,
        city,
        state,
        zipcode,
        country,
        branch,
        priviliges_inspection,
        priviliges_delivery,
        priviliges_equipment,
        status,
      })
      .then(() => {
        repEditModal();
        getData();
        toast.success("Data updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  };

  // datel data

  const [branchData, setBranchData] = useState([]);

  function branchDataGet() {
    axios
      .post(`${global.BASEURL}getBranches`)
      .then((res) => {
        // setBranchData(res.data.data);
        const data = res.data.data;
        const arr = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const obj = { value: element.name, label: element.name };
          arr.push(obj);
        }
        setBranchData(arr);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  useEffect(() => {
    branchDataGet();
  }, []);

  //
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
        .post(`${global.BASEURL}deleteRecord/rep`, {
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

  // data render
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
      name: "Address",
      selector: (row) => row.address,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "State",
      selector: (row) => row.state,
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
                    onClick={() => repEditModal(row)}
                    
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

  // end
  const timeZone = [
    { label: "Australian Western Standard Time (Perth)", value: "Perth" },
    {
      label: "Australian Central Western Standard Time (Eucla)",
      value: "Eucla",
    },
    { label: "Australian Central Standard Time(Adelaide)", value: "Adelaide" },
    { label: "Australian Eastern Standard Time(Sydney)", value: "Sydney" },
  ];

  const countryOptions = countriesData.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  const inspections = [
    { label: "Active", value: "Active" },
    { label: "Deactive", value: "Deactive" },
  ];
  const equipments = [
    { label: "Active", value: "Active" },
    { label: "Deactive", value: "Deactive" },
  ];
  const deliverys = [
    { label: "Active", value: "Active" },
    { label: "Deactive", value: "Deactive" },
  ];

  // Step 2: Add state for managing modal visibility
  const [repEdit, setrepEdit] = useState(false);

  const repEditModal = (result) => {
    setDefaultData_(result);
    setrepEdit(!repEdit);
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
          Employees <span>Reps</span>
        </h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" outline onClick={toggleLargeModal}>
              Add New Rep
            </Button>

            {/* add client modal */}
            <Modal
              isOpen={isLargeModalOpen}
              toggle={toggleLargeModal} // Use the correct toggle function for the large modal
              size="lg"
            >
              <ModalHeader
                toggle={toggleLargeModal} // Use the correct toggle function for the large modal
              ></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img
                    style={{
                      width: "35px",
                      height: "35px",
                    }}
                    src={addReps}
                    alt=""
                  />
                </div>
                <h5 className="modal_title">Add New Rep</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the rep which you want to add.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Select Your Time Zone
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setTimezone(selectedOption.value)
                        }
                        isClearable={false}
                        classNamePrefix="select"
                        options={timeZone}
                      />
                    </Col>
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
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                      />
                    </Col>

                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Password</Label>
                      <Input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Address</Label>
                      <Input
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        placeholder="Address"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Row>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Phone
                          </Label>
                          <Input
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            placeholder="Phone"
                          />
                        </Col>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">City</Label>
                          <Input
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            placeholder="City"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Row>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            State
                          </Label>
                          <Input
                            onChange={(e) => setState(e.target.value)}
                            type="text"
                            placeholder="State"
                          />
                        </Col>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Zip Code
                          </Label>
                          <Input
                            onChange={(e) => setZipcode(e.target.value)}
                            type="number"
                            placeholder="Zip Code"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Row>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Country
                          </Label>
                          <Select
                            onChange={(selectedOption) =>
                              setCountry(selectedOption.value)
                            }
                            isClearable={false}
                            classNamePrefix="select"
                            options={countryOptions}
                          />
                        </Col>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Branch
                          </Label>
                          <Select
                            onChange={(selectedOption) => {
                              setBranch(selectedOption.value);
                            }}
                            isClearable={false}
                            classNamePrefix="select"
                            options={branchData}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Privileges to Inspection
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setPriviliges_inspection(selectedOption.value)
                        }
                        isClearable={false}
                        classNamePrefix="select"
                        options={inspections}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Privileges to Delivery/Return
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setPriviliges_delivery(selectedOption.value)
                        }
                        isClearable={false}
                        classNamePrefix="select"
                        options={deliverys}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Privileges to Equipment
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setPriviliges_equipment(selectedOption.value)
                        }
                        isClearable={false}
                        classNamePrefix="select"
                        options={equipments}
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
              isOpen={repEdit}
              toggle={repEditModal} // Use the correct toggle function for the large modal
              size="lg"
            >
              <ModalHeader
                toggle={repEditModal} // Use the correct toggle function for the large modal
              ></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img
                    style={{
                      width: "35px",
                      height: "35px",
                    }}
                    src={addReps}
                    alt=""
                  />
                </div>
                <h5 className="modal_title">Edit New Rep</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the rep which you want to edit.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Select Your Time Zone
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setTimezone(selectedOption.value)
                        }
                        value={timeZone.find(
                          (option) => option.value === timezone
                        )}
                        isClearable={false}
                        classNamePrefix="select"
                        options={timeZone}
                      />
                    </Col>
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
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={defaultData_?.email}
                        type="email"
                        placeholder="Email"
                      />
                    </Col>

                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Password</Label>
                      <Input
                        onChange={(e) => setPassword(e.target.value)}
                        defaultValue={defaultData_?.password}
                        type="password"
                        placeholder="Password"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Address</Label>
                      <Input
                        onChange={(e) => setAddress(e.target.value)}
                        defaultValue={defaultData_?.address}
                        type="text"
                        placeholder="Address"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Row>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Phone
                          </Label>
                          <Input
                            onChange={(e) => setPhone(e.target.value)}
                            defaultValue={defaultData_?.phone}
                            type="tel"
                            placeholder="Phone"
                          />
                        </Col>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">City</Label>
                          <Input
                            onChange={(e) => setCity(e.target.value)}
                            defaultValue={defaultData_?.city}
                            type="text"
                            placeholder="City"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Row>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            State
                          </Label>
                          <Input
                            onChange={(e) => setState(e.target.value)}
                            defaultValue={defaultData_?.state}
                            type="text"
                            placeholder="State"
                          />
                        </Col>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Zip Code
                          </Label>
                          <Input
                            onChange={(e) => setZipcode(e.target.value)}
                            defaultValue={defaultData_?.zipcode}
                            type="number"
                            placeholder="Zip Code"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Row>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Country
                          </Label>
                          <Select
                            onChange={(selectedOption) =>
                              setCountry(selectedOption.value)
                            }
                            value={countryOptions.find(
                              (option) => option.value === country
                            )}
                            isClearable={false}
                            classNamePrefix="select"
                            options={countryOptions}
                          />
                        </Col>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Branch
                          </Label>
                          <Select
                            onChange={(selectedOption) =>
                              setBranch(selectedOption.value)
                            }
                            value={branchData.find(
                              (option) => option.label === branch
                            )}
                            isClearable={false}
                            classNamePrefix="select"
                            options={branchData}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Privileges to Inspection
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setPriviliges_inspection(selectedOption.value)
                        }
                        value={inspections.find(
                          (option) => option.value === priviliges_inspection
                        )}
                        isClearable={false}
                        classNamePrefix="select"
                        options={inspections}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Privileges to Delivery/Return
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setPriviliges_delivery(selectedOption.value)
                        }
                        value={deliverys.find(
                          (option) => option.value === priviliges_delivery
                        )}
                        isClearable={false}
                        classNamePrefix="select"
                        options={deliverys}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Privileges to Equipment
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setPriviliges_equipment(selectedOption.value)
                        }
                        value={equipments.find(
                          (option) => option.value === priviliges_equipment
                        )}
                        isClearable={false}
                        classNamePrefix="select"
                        options={equipments}
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

            {/* delete modal */}

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

export default RepsPage;
