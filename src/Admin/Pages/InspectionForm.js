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
import modalIcon from "../../Admin/assests/side_icon/inspection_forms - modal.svg";

import { Link } from "react-router-dom";
import {
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

const SafetyEquipments = () => {
  ///////////// first tab api integrat //////////////////////
  const [defaultData_, setDefaultData_] = useState("");
  const [item_type, setItem_type] = useState("");
  const [item_number, setItem_number] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Block");

  useEffect(() => {
    if (defaultData_) {
      setItem_type(defaultData_.item_type);
      setItem_number(defaultData_.item_number);
      setDescription(defaultData_.description);
      setStatus(defaultData_.status);
    }
  }, [defaultData_]);

  // post data

  const postData = (e) => {
    e.preventDefault();

    if (!item_type || !item_number || !description) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setItem_number("");
    setItem_type("");
    setDescription("");
    // setStatus("");

    axios
      .post(`${global.BASEURL}createRecord/inspection`, {
        item_type,
        item_number,
        description,
        status,
      })
      .then(() => {
        toggleFirstTab();
        getData();
        toast.success("Data added successfully.");
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
        toast.error("Failed to add data.");
      });
  };

  // get data with api

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);
  const [dataA, setDataA] = useState([]);
  const [dataB, setDataB] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/inspection`)
      .then((res) => {
        const responseData = res.data.data;
        const scaffoldLocationListData = responseData.filter(
          (item) => item.item_type === "Scaffold Location List"
        );
        const supportingStructureData = responseData.filter(
          (item) => item.item_type === "Supporting Structure"
        );
        const scaffoldStructureData = responseData.filter(
          (item) => item.item_type === "Scaffold Structure"
        );
        setData(scaffoldLocationListData);
        setDataA(supportingStructureData);
        setDataB(scaffoldStructureData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false); // Hide spinner after data is fetched
      });
  }

  useEffect(() => {
    getData("Scaffold Location List");
    getData("Supporting Structure");
    getData("Scaffold Structure");
  }, []);

  // update data with api
  const updateData = (e) => {
    e.preventDefault();
    const itemId = defaultData_?._id;

    axios
      .post(`${global.BASEURL}updateRecord/inspection`, {
        id: itemId,
        item_number,
        description,
      })
      .then(() => {
        toggleEditFirstTab();
        getData();
        toast.success("Data updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  };
  // delet data with api

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
        .post(`${global.BASEURL}deleteRecord/inspection`, {
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

  //////////////// first tab end api integrat  /////////////////////////////////////

  // other data

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
      // maxWidth: "2rem",
    },
    {
      name: "Item Number",
      selector: (row) => row.item_number,
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
              <span>Block</span>
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
        return (
          <div className="d-flex justify-content-end w-100">
            <UncontrolledDropdown>
              <DropdownToggle className="pe-1" tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu className="scrolDrop" end>
                <DropdownItem>
                  <div
                    onClick={() => toggleEditFirstTab(row)}
                    className="btn btn-white w-100 p-0 m-0"
                  >
                    <span className="align-middle ms-50">Edit</span>
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div
                    className="btn btn-white w-100 p-0 m-0"
                    onClick={() => handleDelete(row._id)}
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

  const [isFirstTab, setIsFirstTab] = useState(false);
  const toggleFirstTab = () => {
    setIsFirstTab(!isFirstTab);
  };

  const [editFirstTab, setEditFirstTab] = useState(false);
  const toggleEditFirstTab = (result) => {
    setDefaultData_(result);
    setEditFirstTab(!editFirstTab);
  };

  const selectType = [
    { label: "Scaffold Location List", value: "Scaffold Location List" },
    { label: "Supporting Structure", value: "Supporting Structure" },
    { label: "Scaffold Structure", value: "Scaffold Structure" },
  ];
  return (
    <>
      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">Forms / Forms / Inspection Forms</h5>
        <Button onClick={toggleFirstTab} className="default_btn me-2">
          Add New
        </Button>

        {/* modal first tab */}
        <Modal isOpen={isFirstTab} toggle={toggleFirstTab} size="lg">
          <ModalHeader toggle={toggleFirstTab}></ModalHeader>
          <ModalBody>
            <div className="icon_div_main mb-2">
              <img className="icon_sizee" src={modalIcon} alt="" />
            </div>
            <h5 className="modal_title">Add New Locatioon</h5>
            <span className="modal_subtitle">
              Enter the correct details of the branch which you want to add.
            </span>

            <Form className="d-flex flex-column p-1">
              <Row>
                <Col className="mb-2" lg="6" md="12">
                  <Label className="value_font input_label">Select Type</Label>
                  <Select
                    onChange={(selectedOption) =>
                      setItem_type(selectedOption.value)
                    }
                    isClearable={false}
                    classNamePrefix="select"
                    options={selectType}
                  />
                </Col>
                <Col className="mb-2" lg="6" md="12">
                  <Label className="value_font input_label">Item Name</Label>
                  <Input
                    onChange={(e) => setItem_number(e.target.value)}
                    type="number"
                    placeholder="Item Number"
                  />
                </Col>
                <Col className="mb-2" lg="6" md="12">
                  <Label className="value_font input_label">Description</Label>
                  <Input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="Description"
                  />
                </Col>
              </Row>
              <div className="mx-auto">
                <Button
                  onClick={postData}
                  type="submit"
                  className="mt-2 default_btn"
                >
                  Add List
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
        {/* modal first tab edit modal*/}
        <Modal isOpen={editFirstTab} toggle={toggleEditFirstTab} size="lg">
          <ModalHeader toggle={toggleEditFirstTab}></ModalHeader>
          <ModalBody>
            <div className="icon_div_main mb-2">
              <img className="icon_sizee" src={modalIcon} alt="" />
            </div>
            <h5 className="modal_title">Add New Locatioon</h5>
            <span className="modal_subtitle">
              Enter the correct details of the branch which you want to add.
            </span>
            <Form className="d-flex flex-column p-1">
              <Row>
                <Col className="mb-2" lg="6" md="12">
                  <Label className="value_font input_label">Item Name</Label>
                  <Input
                    onChange={(e) => setItem_number(e.target.value)}
                    defaultValue={defaultData_?.item_number}
                    type="number"
                    placeholder="Item Number"
                  />
                </Col>
                <Col className="mb-2" lg="6" md="12">
                  <Label className="value_font input_label">Description</Label>
                  <Input
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={defaultData_?.description}
                    type="text"
                    placeholder="Description"
                  />
                </Col>
              </Row>
              <div className="mx-auto">
                <Button
                  onClick={updateData}
                  type="submit"
                  className="mt-2 default_btn"
                >
                  Update Data
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
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
            <Button
              color="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Fragment>
        <ToastContainer />
        <Nav tabs>
          <NavItem className="me-2">
            <NavLink
              className={activeTabSection1 === "1" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("1");
              }}
            >
              Scaffold Location
            </NavLink>
          </NavItem>
          <NavItem className="me-2">
            <NavLink
              className={activeTabSection1 === "2" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("2");
              }}
            >
              Foundations / Supporting Structure
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTabSection1 === "3" ? "active" : ""}
              onClick={() => {
                toggleTabSection1("3");
              }}
            >
              Scaffold Structure
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="py-50" activeTab={activeTabSection1}>
          <TabPane tabId="1">
            <div className="d-flex align-align-items-center justify-content-between sm_column mt-2">
              <h5 className="head_title">Scaffold Location List</h5>

              <Input
                type="search"
                style={{ width: "fit-content" }}
                placeholder="Search"
                className="form-control"
              />
            </div>
            <div className="table_main p-1 mt-1 pb-3">
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
                <p className="text-center">There is no data to show.</p>
              ) : (
                <ClientDataTable columns={columns} data={data} />
              )}
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="d-flex align-align-items-center justify-content-between mt-2">
              <h5 className="head_title">Foundations / Supporting Structure</h5>
              <Input
                type="search"
                style={{ width: "fit-content" }}
                placeholder="Search"
                className="form-control"
              />
            </div>
            <div className="table_main p-1 mt-1 pb-3">
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
                <p className="text-center">There is no data to show.</p>
              ) : (
                <ClientDataTable columns={columns} data={dataA} />
              )}
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="d-flex align-align-items-center justify-content-between mt-2">
              <h5 className="head_title">Scaffold Structure</h5>
              <Input
                type="search"
                style={{ width: "fit-content" }}
                placeholder="Search"
                className="form-control"
              />
            </div>
            <div className="table_main p-1 mt-1 pb-3">
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
                <p className="text-center">There is no data to show.</p>
              ) : (
                <ClientDataTable columns={columns} data={dataB} />
              )}
            </div>
          </TabPane>
        </TabContent>

        {/* secound tab start */}
      </Fragment>
    </>
  );
};

export default SafetyEquipments;
