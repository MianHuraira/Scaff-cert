import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import "./table.css";
import Select from "react-select";
import { Col, Row, Spinner, Tooltip } from "react-bootstrap";
import active from "../../Admin/assests/icons/active.png";
import jobIcon from "../../Admin/assests/add_new_job.svg";
import qr_code from "../../Admin/assests/qr_code.png";
import document from "../../Admin/assests/document.svg";
import cube from "../../Admin/assests/cube.svg";
import mini_truck from "../../Admin/assests/mini-truck.svg";
import mini_full from "../../Admin/assests/mini-full.svg";
import check from "../../Admin/assests/check.png";
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
import { log } from "@craco/craco/lib/logger";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
const iconS = {
  width: "16px",
  height: "16px",
};
const icon_sizee = {
  width: "45px",
  height: "45px",
};

const JobPage = () => {
  const [defaultData_, setDefaultData_] = useState("");

  // states for update and insert data

  const [branch, setBranch] = useState("");
  const [group, setGroup] = useState("");
  const [job_no, setJob_no] = useState("");
  const [client, setClient] = useState("");
  const [job_name, setJob_name] = useState("");
  const [job_address, setJob_address] = useState("");
  const [description, setDescription] = useState("");
  const [load_rating, setLoad_rating] = useState("");
  const [drawing_numbers, setDrawing_numbers] = useState("");
  const [platforms, setPlatforms] = useState("");
  const [open_work, setOpen_work] = useState("");
  const [purpose, setPurpose] = useState("");
  const [day_hire, setDay_hire] = useState("false");
  const [status, setStatus] = useState("Completed");

  useEffect(() => {
    if (defaultData_) {
      setBranch(defaultData_.branch);
      setGroup(defaultData_.group);
      setJob_no(defaultData_.job_no);
      setClient(defaultData_.client);
      setJob_name(defaultData_.job_name);
      setJob_address(defaultData_.job_address);
      setDescription(defaultData_.description);
      setLoad_rating(defaultData_.load_rating);
      setDrawing_numbers(defaultData_.drawing_numbers);
      setPlatforms(defaultData_.platforms);
      setOpen_work(defaultData_.open_work);
      setPurpose(defaultData_.purpose);
      setDay_hire(defaultData_.day_hire);
      setStatus(defaultData_.status);
    }
  }, [defaultData_]);

  // post data

  const postData = (e) => {
    e.preventDefault();
    if (
      !branch ||
      !group ||
      !job_no ||
      !client ||
      !job_name ||
      !job_address ||
      !description ||
      !load_rating ||
      !drawing_numbers ||
      !platforms ||
      !open_work ||
      !purpose
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setBranch("");
    setGroup("");
    setJob_no("");
    setClient("");
    setJob_name("");
    setJob_address("");
    setDescription("");
    setLoad_rating("");
    setDrawing_numbers("");
    setPlatforms("");
    setOpen_work("");
    setPurpose("");
    setDay_hire("");
    // setStatus("");

    axios
      .post(`${global.BASEURL}createRecord/jobs`, {
        branch,
        group,
        job_no,
        client,
        job_name,
        job_address,
        description,
        load_rating,
        drawing_numbers,
        platforms,
        open_work,
        purpose,
        day_hire,
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
      .post(`${global.BASEURL}getRecords/jobs`)
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
    branchDataGet(); ///// branch api
    clientDataGet(); ///// client api
  }, []);

  // update data

  const updateData = (e) => {
    e.preventDefault();
    const itemId = defaultData_?._id;

    axios
      .post(`${global.BASEURL}updateRecord/jobs`, {
        id: itemId,
        branch,
        group,
        job_no,
        client,
        job_name,
        job_address,
        description,
        load_rating,
        drawing_numbers,
        platforms,
        open_work,
        purpose,
        day_hire,
        // status,
      })
      .then(() => {
        editModal();
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

  // get branch data from api

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
  const [clientData, setClientData] = useState([]);

  function clientDataGet() {
    axios
      .post(`${global.BASEURL}getClients`)
      .then((res) => {
        // setBranchData(res.data.data);
        const data = res.data.data;
        const arr = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const obj = { value: element.name, label: element.name };
          arr.push(obj);
        }
        setClientData(arr);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  // chnage status with modal complete
  const [completeModal, setCompleteModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [lastStatus, setLastStatus] = useState("");

  const togglaModalCompl = (rowId, preStatus) => {
    setSelectedRowId(rowId);
    setCompleteModal(true);
    setLastStatus(preStatus);
  };

  const moveToPickJobs = (e, status) => {
    e.preventDefault();
    axios
      .post(`${global.BASEURL}updateRecord/jobs`, {
        status: status,
        id: selectedRowId,
        last_status: lastStatus,
      })
      .then(() => {
        getData();
        toast.success("Data Update successfully.");
      })
      .catch((error) => {
        console.error("Error updated data:", error);
        toast.error("Failed to delete data.");
      });

    setCompleteModal(false);
  };

  const lastStatusUpdate = (lastStatus, id) => {
    // Yahan aap apni API request bhej sakte hain
    axios
      .post(`${global.BASEURL}updateRecord/jobs`, {
        id: id,
        status: lastStatus,
      })
      .then(() => {
        getData();
        // Status update ho gaya, aap kuch aur actions le sakte hain
        console.log("Status updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  // ended api section

  const columns = [
    {
      name: "Sr.no",
      selector: (row, index) => index + 1,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Job No",
      selector: (row) => row.job_no,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Client",
      selector: (row) => row.client,
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
      name: "Job Address",
      selector: (row) => row.job_address,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Job Docket",
      selector: (row) => (
        <div className="d-flex align-items-center flex-wrap">
          {row.status === "Move to Picklist" ? (
            <>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip1">Pick Order</Tooltip>}
              >
                <Link to={`/job_add/${row._id}?tabKey=cube`}>
                  <img
                    src={cube}
                    alt="active"
                    style={iconS}
                    className="me-1 mb-1"
                  />
                </Link>
              </OverlayTrigger>
            </>
          ) : row.status === "Create Delivery Docket" ? (
            <>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip1">Create Delivery Docket</Tooltip>
                }
              >
                <Link to={`/job_add/${row._id}?tabKey=deli`}>
                  <img
                    src={mini_truck}
                    alt="active"
                    style={iconS}
                    className="me-1 mb-1"
                  />
                </Link>
              </OverlayTrigger>
            </>
          ) : row.status === "Item(s) successfully Returned" ? (
            <>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip1">Create Picklist</Tooltip>}
              >
                <Link to={`/job_add/${row._id}?tabKey=desiredKey`}>
                  <img
                    src={document}
                    alt="active"
                    style={iconS}
                    className="me-1 mb-1"
                  />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip1">Delivery</Tooltip>}
              >
                <Link to={`/job_add/${row._id}?tabKey=ret`}>
                  <img
                    src={mini_full}
                    alt="active"
                    style={iconS}
                    className="me-1 mb-1"
                  />
                </Link>
              </OverlayTrigger>
            </>
          ) : row.status === "Delivery Succesfully" ? (
            <>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip1">Delivery</Tooltip>}
              >
                <Link to={`/job_add/${row._id}?tabKey=ret`}>
                  <img
                    src={mini_full}
                    alt="active"
                    style={iconS}
                    className="me-1 mb-1"
                  />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip1">Pick Order</Tooltip>}
              >
                <Link to={`/job_add/${row._id}?tabKey=cube`}>
                  <img
                    src={cube}
                    alt="active"
                    style={iconS}
                    className="me-1 mb-1"
                  />
                </Link>
              </OverlayTrigger>
            </>
          ) : row.status === "Complete" ? (
            <></>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip1">Create Picklist</Tooltip>}
            >
              <Link to={`/job_add/${row._id}?tabKey=desiredKey`}>
                <img
                  src={document}
                  alt="active"
                  style={iconS}
                  className="me-1 mb-1"
                />
              </Link>
            </OverlayTrigger>
          )}
        </div>
      ),
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Inspection",
      cell: (row) => (
        <div>
          <h5 className="inspc cursor_p">Inspection</h5>
          {row.status !== "Complete" && (
            <h5
              onClick={() => togglaModalCompl(row._id, row.status)}
              className="comL cursor_p"
            >
              Complete
            </h5>
          )}
        </div>
      ),
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "QR Code",
      cell: (row) => (
        <img
          src={qr_code}
          alt="active"
          width="30"
          height="30"
          className="me-1"
        />
      ),

      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row.status === "Complete" ? (
            <h5
              onClick={() => lastStatusUpdate(row.last_status, row._id)}
              className="comp_div"
            >
              {row.status}
            </h5>
          ) : (
            <div className="d-flex align-items-center">
              <img
                src={active}
                alt="active"
                width="11"
                height="11"
                className="me-1"
              />
              <span>Active</span>
            </div>
          )}
        </>
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
            <UncontrolledDropdown className="">
              <DropdownToggle className="pe-1 " tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <div
                    onClick={() => editModal(row)}
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
                <DropdownItem>
                  <Link
                    to={`/job_detail/${id}`}
                    className="btn w-100 btn-white p-0 m-0"
                  >
                    <span className="align-middle ms-50">View</span>
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

  const groupData = [
    { label: "NSW", value: "NSW" },
    { label: "abc", value: "abc" },
    { label: "asd", value: "asd" },
  ];

  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  const toggleLargeModal = () => {
    setIsLargeModalOpen(!isLargeModalOpen);
  };

  // complete modal

  // edit modal

  const [iseditOpen, setiseditOpen] = useState(false);

  const editModal = (result) => {
    setDefaultData_(result);
    setiseditOpen(!iseditOpen);
  };
  return (
    <>
      <ToastContainer />

      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">Job</h5>

        <div className="d-flex align-items-center">
          <div>
            {/* <Link to="/job_add"> */}
            <Button
              data-toggle="tooltip"
              onClick={toggleLargeModal}
              className="default_btn"
            >
              Add Job
            </Button>

            {/* </Link> */}

            {/* add modal */}
            <Modal
              isOpen={isLargeModalOpen}
              toggle={toggleLargeModal}
              size="lg"
            >
              <ModalHeader toggle={toggleLargeModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img style={icon_sizee} src={jobIcon} alt="" />
                </div>
                <h5 className="modal_title">Add New Job</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the job which you want to add.
                </span>
                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Select the Branch to Assign this Job
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
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Select the Group to Assign this Job
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setGroup(selectedOption.value)
                        }
                        isClearable={false}
                        classNamePrefix="select"
                        options={groupData}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Job Number
                      </Label>
                      <Input
                        onChange={(e) => setJob_no(e.target.value)}
                        type="number"
                        placeholder="Job Number"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Client</Label>
                      <Select
                        onChange={(selectedOption) => {
                          setClient(selectedOption.value);
                        }}
                        isClearable={false}
                        classNamePrefix="select"
                        options={clientData}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Job Name</Label>
                      <Input
                        onChange={(e) => setJob_name(e.target.value)}
                        type="text"
                        placeholder="Job Name"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Job Address
                      </Label>
                      <Input
                        onChange={(e) => setJob_address(e.target.value)}
                        type="text"
                        placeholder="Job Address"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Job Description
                      </Label>
                      <Input
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Job Description"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Load Rating
                      </Label>
                      <Input
                        onChange={(e) => setLoad_rating(e.target.value)}
                        type="number"
                        placeholder="Load Rating"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Drawing Numbers
                      </Label>
                      <Input
                        onChange={(e) => setDrawing_numbers(e.target.value)}
                        type="number"
                        placeholder="Drawing  Numbers"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Total Number Of Platforms
                      </Label>
                      <Input
                        onChange={(e) => setPlatforms(e.target.value)}
                        type="number"
                        placeholder="Total Number Of Platforms"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Open Work Platforms No From The Ground Up
                      </Label>
                      <Input
                        onChange={(e) => setOpen_work(e.target.value)}
                        type="text"
                        placeholder="Open Work Platforms"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Intended Purpose
                      </Label>
                      <Input
                        onChange={(e) => setPurpose(e.target.value)}
                        type="text"
                        placeholder="Intended Purpose"
                      />
                      <div className="mt-2">
                        <Input
                          onChange={(e) => setDay_hire(e.target.checked)}
                          className="me-1"
                          type="checkbox"
                        />
                        <Label className="value_font input_label">
                          Dry Hire Job
                        </Label>
                      </div>
                    </Col>
                  </Row>
                  <div className="mx-auto">
                    <Button
                      onClick={postData}
                      type="submit"
                      className="mt-2 default_btn"
                    >
                      Add Job
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>

            {/* edit modal start */}

            <Modal isOpen={iseditOpen} toggle={editModal} size="lg">
              <ModalHeader toggle={editModal}></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img style={icon_sizee} src={jobIcon} alt="" />
                </div>
                <h5 className="modal_title">Edit Job</h5>
                <span className="modal_subtitle">
                  Eneter the correct details of your job which you want to edit.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Select the Branch to Assign this Job
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
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Select the Group to Assign this Job
                      </Label>
                      <Select
                        onChange={(selectedOption) =>
                          setGroup(selectedOption.value)
                        }
                        value={groupData.find(
                          (option) => option.value === group
                        )}
                        isClearable={false}
                        classNamePrefix="select"
                        options={groupData}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Job Number
                      </Label>
                      <Input
                        defaultValue={defaultData_?.job_no}
                        onChange={(e) => setJob_no(e.target.value)}
                        type="number"
                        placeholder="Job Number"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Client</Label>
                      <Select
                        onChange={(selectedOption) =>
                          setClient(selectedOption.value)
                        }
                        value={clientData.find(
                          (option) => option.label === client
                        )}
                        isClearable={false}
                        classNamePrefix="select"
                        options={clientData}
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">Job Name</Label>
                      <Input
                        defaultValue={defaultData_?.job_name}
                        onChange={(e) => setJob_name(e.target.value)}
                        type="text"
                        placeholder="Job Name"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Job Address
                      </Label>
                      <Input
                        defaultValue={defaultData_?.job_address}
                        onChange={(e) => setJob_address(e.target.value)}
                        type="text"
                        placeholder="Job Address"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Job Description
                      </Label>
                      <Input
                        defaultValue={defaultData_?.description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Job Description"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Load Rating
                      </Label>
                      <Input
                        defaultValue={defaultData_?.load_rating}
                        onChange={(e) => setLoad_rating(e.target.value)}
                        type="number"
                        placeholder="Load Rating"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Drawing Numbers
                      </Label>
                      <Input
                        defaultValue={defaultData_?.drawing_numbers}
                        onChange={(e) => setDrawing_numbers(e.target.value)}
                        type="number"
                        placeholder="Drawing  Numbers"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Total Number Of Platforms
                      </Label>
                      <Input
                        defaultValue={defaultData_?.platforms}
                        onChange={(e) => setPlatforms(e.target.value)}
                        type="number"
                        placeholder="Total Number Of Platforms"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Open Work Platforms No From The Ground Up
                      </Label>
                      <Input
                        defaultValue={defaultData_?.open_work}
                        onChange={(e) => setOpen_work(e.target.value)}
                        type="text"
                        placeholder="Open Work Platforms"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Intended Purpose
                      </Label>
                      <Input
                        defaultValue={defaultData_?.purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        type="text"
                        placeholder="Intended Purpose"
                      />
                      <div className="mt-2">
                        <Input
                          checked={day_hire === "true"}
                          onChange={(e) =>
                            setDay_hire(e.target.checked ? "true" : "false")
                          }
                          className="me-1"
                          type="checkbox"
                        />
                        <Label className="value_font input_label">
                          Dry Hire Job
                        </Label>
                      </div>
                    </Col>
                  </Row>
                  <div className="mx-auto">
                    <Button
                      onClick={updateData}
                      type="submit"
                      className="mt-2 default_btn"
                    >
                      Add Job
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>

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
                  className="text-center"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="">All</span>
                </DropdownItem>
                <DropdownItem
                  href="/"
                  tag="a"
                  className="text-center"
                  onClick={(e) => e.preventDefault()}
                >
                  New User
                </DropdownItem>
                <DropdownItem
                  href="/"
                  tag="a"
                  className="text-center"
                  onClick={(e) => e.preventDefault()}
                >
                  Active User
                </DropdownItem>
                <DropdownItem
                  href="/"
                  tag="a"
                  className="text-center"
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

      {/* compelet modal start */}

      <Modal
        isOpen={completeModal}
        aria-labelledby="contained-modal-title-vcenter"
        toggle={togglaModalCompl}
        size="sm"
        centered
      >
        <ModalHeader toggle={togglaModalCompl}></ModalHeader>
        <ModalBody className="d-flex align-items-center justify-content-center flex-column">
          <div className="circle_div d-flex align-items-center justify-content-center mb-3">
            <img src={check} alt="" />
          </div>
          <h5>Job Completed!</h5>
          <Button
            onClick={(e) => moveToPickJobs(e, "Complete")}
            type="submit"
            className="mt-2 default_btn"
          >
            Ok
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default JobPage;
