import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";

// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { Fragment, useEffect, useState } from "react";
import "./table.css";
import Select from "react-select";
import { Breadcrumb, Card, Col, Row, Spinner } from "react-bootstrap";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";
import safetyIcon from "../../Admin/assests/safety_icon.png";
import newInspec from "../../Admin/assests/new_inspection.png";

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
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

import { MoreHorizontal, Trash, Edit2 } from "react-feather";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

const SafetyEquipments = () => {
  const [defaultData_, setDefaultData_] = useState("");
  // states for update and insert data

  const [id_number, setId_number] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [manuf_date, setManuf_date] = useState("");
  const [expiry_date, setExpiry_date] = useState("");
  const [owner_id, setOwner_id] = useState("");
  const [inspection_month, setInspection_month] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (defaultData_) {
      setId_number(defaultData_.id_number);
      setModel(defaultData_.model);
      setDescription(defaultData_.description);
      setManuf_date(defaultData_.manuf_date);
      setExpiry_date(defaultData_.expiry_date);
      setOwner_id(defaultData_.owner_id);
      setInspection_month(defaultData_.inspection_month);

      setStatus(defaultData_.status);
    }
  }, [defaultData_]);

  // post data with api

  const postData = (e) => {
    e.preventDefault();
    if (
      !id_number ||
      !model ||
      !description ||
      !manuf_date ||
      !expiry_date ||
      !owner_id ||
      !inspection_month
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setId_number("");
    setModel("");
    setDescription("");
    setManuf_date("");
    setExpiry_date("");
    setOwner_id("");
    setInspection_month("");
    // setStatus("");

    axios
      .post(`${global.BASEURL}createRecord/equipment`, {
        id_number,
        model,
        description,
        manuf_date,
        expiry_date,
        owner_id,
        inspection_month,
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

  const [isLoading, setIsLoading] = useState(true);

  // get data from api
  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/equipment`)
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

  // update data with api

  const updateData = (e) => {
    e.preventDefault();
    const itemId = defaultData_?._id;
    axios
      .post(`${global.BASEURL}updateRecord/equipment`, {
        id: itemId,
        id_number,
        model,
        description,
        manuf_date,
        expiry_date,
        owner_id,
        inspection_month,
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

  // delet data from api
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
        .post(`${global.BASEURL}deleteRecord/equipment`, {
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

  // end crud oprt

  const [newInspection, setNewInspection] = useState(false);
  const newInspectionModal = () => {
    setNewInspection(!newInspection);
  };

  const [inspectionLog, setInspectionLog] = useState(false);
  const inspectionLogModal = () => {
    setInspectionLog(!inspectionLog);
  };

  const [activeTabSection1, setActiveTabSection1] = useState("1");

  const toggleTabSection1 = (tab) => {
    if (activeTabSection1 !== tab) {
      setActiveTabSection1(tab);
    }
  };

  const columns = [
    {
      name: "Sr.no",
      selector: (row, index) => index + 1,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Equipment ID",
      selector: (row) => row.id_number,
      sortable: "true",
      // maxWidth: "2rem",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Tag Number",
      selector: (row) => row.tag_number,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Expiry Date",
      selector: (row) => row.expiry_date,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Owner",
      selector: (row) => row.owner_id,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Inspection",
      selector: (row) => (
        <>
          <div>
            <div outline onClick={newInspectionModal}>
              <h5 className="inps_text">New Inspection</h5>
            </div>
            <div outline onClick={inspectionLogModal}>
              <h5 className="inps_text">Inspection Log</h5>
            </div>
          </div>
        </>
      ),
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
                    <div className="align-middle ms-50">Delete</div>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  let dataA = [
    {
      srno: "09",
      equipment_id: "Atif",
      tag_number: "038392833",
      last_inspec: "FSD",
      next_inspec: "NSW",
      inspec_by: "NSW",
    },
  ];

  const columnsA = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Equipment ID",
      selector: (row) => row.equipment_id,
      sortable: "true",
      // maxWidth: "2rem",
    },

    {
      name: "Tag Number",
      selector: (row) => row.tag_number,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Last Inspection",
      selector: (row) => row.last_inspec,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Next Inspection",
      selector: (row) => row.next_inspec,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Inspect By",
      selector: (row) => row.inspec_by,
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
          <div className="d-flex justify-content-end w-100">
            <UncontrolledDropdown className="">
              <DropdownToggle className="pe-1 " tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <Link
                    outline
                    // onClick={toggleLargeModaledit}
                    className="btn btn-white p-0 m-0"
                  >
                    <span className="align-middle ms-50">Edit</span>
                  </Link>
                </DropdownItem>

                <DropdownItem>
                  <span className="align-middle ms-50">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  let dataB = [
    {
      srno: "09",
      equipment_id: "Atif",
      tag_number: "038392833",
      last_inspec: "FSD",
      next_inspec: "NSW",
      inspec_by: "NSW",
    },
  ];

  const columnsB = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Equipment ID",
      selector: (row) => row.equipment_id,
      sortable: "true",
      // maxWidth: "2rem",
    },

    {
      name: "Tag Number",
      selector: (row) => row.tag_number,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Last Inspection",
      selector: (row) => row.last_inspec,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Next Inspection",
      selector: (row) => row.next_inspec,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Inspect By",
      selector: (row) => row.inspec_by,
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
          <div className="d-flex justify-content-end w-100">
            <UncontrolledDropdown className="">
              <DropdownToggle className="pe-1 " tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <Link
                    outline
                    // onClick={toggleLargeModaledit}
                    className="btn btn-white p-0 m-0"
                  >
                    <span className="align-middle ms-50">Edit</span>
                  </Link>
                </DropdownItem>

                <DropdownItem>
                  <span className="align-middle ms-50">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  // secound tab column data start
  const columnsC = [
    {
      name: "Tag Number",
      selector: (row) => row.tag_nbr,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Last Inspection",
      selector: (row) => row.last_inspection,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Next Inspection",
      selector: (row) => row.next_inspection,
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
      cell: () => {
        // modal edit

        return (
          <div className="d-flex justify-content-end w-100">
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
  // secound tab data
  let dataC = [
    {
      tag_nbr: "09",
      last_inspection: "Standard 3.0m",
      next_inspection: "10",
      status: "Expired",
    },
  ];

  // edit client modal start

  // end
  const selectState = [
    { label: "Me", value: "Me" },
    { label: "Max Well", value: "Max Well" },
    { label: "Imran Ameen", value: "Imran Ameen" },
    { label: "Raza Ali", value: "Raza Ali" },
  ];
  const selectStaus = [
    { label: "Every 3 Months", value: "Every 3 Months" },
    { label: "Every 4 Months", value: "Every 4 Months" },
    { label: "Every 5 Months", value: "Every 5 Months" },
    { label: "Every 6 Months", value: "Every 6 Months" },
  ];

  // Step 2: Add state for managing modal visibility

  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const toggleLargeModal = () => {
    setIsLargeModalOpen(!isLargeModalOpen);
  };

  // edit modal

  const [repEdit, setrepEdit] = useState(false);

  const repEditModal = (result) => {
    setDefaultData_(result);
    setrepEdit(!repEdit);
  };

  const [changeImage, setChangeImage] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setChangeImage(imageUrl);
  };

  return (
    <>
      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title"> Safety Equipments</h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" outline onClick={toggleLargeModal}>
              Add Safety Equipment
            </Button>

            {/* add equipment modal */}
            <Modal
              isOpen={isLargeModalOpen}
              toggle={toggleLargeModal}
              size="lg"
            >
              <ModalHeader toggle={toggleLargeModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img className="icon_sizee" src={safetyIcon} alt="" />
                </div>
                <h5 className="modal_title">Add Equipment</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the equipment which you want to
                  add.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        ID Number
                      </Label>
                      <Input
                        onChange={(e) => setId_number(e.target.value)}
                        type="text"
                        placeholder="ID Number"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Model</Label>
                      <Input
                        onChange={(e) => setModel(e.target.value)}
                        type="text"
                        placeholder="Modal"
                      />
                    </Col>

                    <Col className="mb-2" lg="12" md="12">
                      <Label className="value_font input_label">
                        Description
                      </Label>
                      <Input
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Description"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Manufacture Date
                      </Label>
                      <Input
                        onChange={(e) => setManuf_date(e.target.value)}
                        type="date"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Expiry Date
                      </Label>
                      <Input
                        onChange={(e) => setExpiry_date(e.target.value)}
                        type="date"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Owner</Label>
                      <Select
                        onChange={(selectedOption) =>
                          setOwner_id(selectedOption.value)
                        }
                        isClearable={false}
                        classNamePrefix="select"
                        options={selectState}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Inspection Month
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setInspection_month(selectedOption.value)
                        }
                        isClearable={false}
                        classNamePrefix="select"
                        options={selectStaus}
                      />
                    </Col>
                  </Row>
                  <div className="mx-auto">
                    <Button
                      onClick={postData}
                      type="submit"
                      className="mt-2 default_btn"
                    >
                      Save Equipment
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>

            {/* DELET WITH API  */}

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

            {/* edit modal equipment  */}

            <Modal isOpen={repEdit} toggle={repEditModal} size="lg">
              <ModalHeader toggle={repEditModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img className="icon_sizee" src={safetyIcon} alt="" />
                </div>
                <h5 className="modal_title">Edit Equipment</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the equipment which you want to
                  Edit.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        ID Number
                      </Label>
                      <Input
                        onChange={(e) => setId_number(e.target.value)}
                        defaultValue={defaultData_?.id_number}
                        type="text"
                        placeholder="ID Number"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Model</Label>
                      <Input
                        onChange={(e) => setModel(e.target.value)}
                        defaultValue={defaultData_?.model}
                        type="text"
                        placeholder="Modal"
                      />
                    </Col>

                    <Col className="mb-2" lg="12" md="12">
                      <Label className="value_font input_label">
                        Description
                      </Label>
                      <Input
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue={defaultData_?.description}
                        type="text"
                        placeholder="Description"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Manufacture Date
                      </Label>
                      <Input
                        onChange={(e) => setManuf_date(e.target.value)}
                        defaultValue={defaultData_?.manuf_date}
                        type="date"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Expiry Date
                      </Label>
                      <Input
                        onChange={(e) => setExpiry_date(e.target.value)}
                        defaultValue={defaultData_?.expiry_date}
                        type="date"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Owner</Label>
                      <Select
                        onChange={(selectedOption) =>
                          setOwner_id(selectedOption.value)
                        }
                        value={selectState.find(
                          (option) => option.value === owner_id
                        )}
                        isClearable={false}
                        classNamePrefix="select"
                        options={selectState}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Inspection Month
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setInspection_month(selectedOption.value)
                        }
                        value={selectStaus.find(
                          (option) => option.value === inspection_month
                        )}
                        isClearable={false}
                        classNamePrefix="select"
                        options={selectStaus}
                      />
                    </Col>
                  </Row>
                  <div className="mx-auto">
                    <Button
                      onClick={updateData}
                      type="submit"
                      className="mt-2 default_btn"
                    >
                      Save Equipment
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>

            {/* new inspection modal */}

            <Modal isOpen={newInspection} toggle={newInspectionModal} size="lg">
              <ModalHeader toggle={newInspectionModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img className="icon_sizee" src={newInspec} alt="" />
                </div>
                <h5 className="modal_title">New Inspection</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the equipment which you want to
                  inspect.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Equipment ID
                      </Label>
                      <Input type="text" placeholder="Equipment ID" />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Tag Number
                      </Label>
                      <Input type="text" placeholder="Tag Number" />
                    </Col>

                    <Col className="mb-2" lg="12" md="12">
                      <Label className="value_font input_label">Notes</Label>
                      <Input type="text" placeholder="Notes" />
                    </Col>

                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Condition
                      </Label>
                      <Select
                        isClearable={false}
                        classNamePrefix="select"
                        options={selectState}
                      />
                    </Col>

                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Next Inspection
                      </Label>
                      <Input type="date" />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Image Upload
                      </Label>
                      <input
                        class="custom-file-input"
                        type="file"
                        onChange={handleImage}
                      />
                      {changeImage && (
                        <div className="mt-2">
                          <img
                            src={changeImage}
                            alt="Selected"
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <div className="text-center">
                        <Button
                          onClick={newInspectionModal}
                          type="submit"
                          className="default_btn me-2"
                        >
                          Create Inspection
                        </Button>
                        <Button type="submit" className="default_btn2">
                          Cancel
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>

            {/* inspection log*/}

            <Modal isOpen={inspectionLog} toggle={inspectionLogModal} size="lg">
              <ModalHeader toggle={inspectionLogModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img className="icon_sizee" src={newInspec} alt="" />
                </div>
                <h5 className="modal_title">Inspection Log</h5>
                <span className="modal_subtitle">
                  B# A-23419 - S# SC752625 - Inspection Log
                </span>

                <div className="table_main p-1 mt-2">
                  <ClientDataTable columns={columnsC} data={dataC} />
                </div>
              </ModalBody>
            </Modal>
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
              Safety Equipment List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabSection1 === "2" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("2");
              }}
            >
              Inspection In A Week
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabSection1 === "3" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("3");
              }}
            >
              Overdue Inspection List
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="py-50" activeTab={activeTabSection1}>
          <TabPane tabId="1">
            <div className="d-flex align-align-items-center justify-content-between mt-2">
              <h5 className="head_title">Safety Equipment List</h5>
              <input
                type="search"
                style={{ width: "fit-content" }}
                placeholder="Search"
                className="form-control"
              />
            </div>
            <div className="mt-1">
              <ClientDataTable columns={columns} data={data} />
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="d-flex align-align-items-center justify-content-between mt-2">
              <h5 className="head_title">Inspection In A Week </h5>
              <input
                type="search"
                style={{ width: "fit-content" }}
                placeholder="Search"
                className="form-control"
              />
            </div>
            <div className="mt-1">
              <ClientDataTable columns={columnsA} data={dataA} />
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="d-flex align-align-items-center justify-content-between mt-2">
              <h5 className="head_title">Overdue Inspection List</h5>
              <input
                type="search"
                style={{ width: "fit-content" }}
                placeholder="Search"
                className="form-control"
              />
            </div>
            <div className="mt-1">
              <ClientDataTable columns={columnsB} data={dataB} />
            </div>
          </TabPane>
        </TabContent>

        {/* secound tab start */}
      </Fragment>
    </>
  );
};

export default SafetyEquipments;
