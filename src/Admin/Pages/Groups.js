import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table"
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import "./table.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";
import group_icon from "../../Admin/assests/side_icon/group_icon.png";

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

const GroupsPage = () => {
  const [defaultData_, setDefaultData_] = useState({});

  // states for update and insert data

  const [name, setName] = useState("");
  const [rep_ids, setRep_ids] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (defaultData_) {
      setName(defaultData_.name);
      setRep_ids(defaultData_.rep_ids);
      setStatus(defaultData_.status);
    }
  }, [defaultData_]);

  // add data

  const postData = (e) => {
    e.preventDefault();
    if (!name || !rep_ids || !status) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setName("");
    setRep_ids("");
    setStatus("");

    axios
      .post(`${global.BASEURL}createRecord/groups`, {
        name,
        rep_ids,
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
      .post(`${global.BASEURL}getRecords/groups`)
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
      .post(`${global.BASEURL}updateRecord/groups`, {
        id: itemId,
        name,
        rep_ids,
        status,
      })
      .then(() => {
        groupEditModal();
        getData();
        toast.success("Data updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  };

  // get rep from api

  const [repData, setRepData] = useState([]);
  // Function to fetch repData
  const fetchRepData = async () => {
    try {
      const response = await axios.post(`${global.BASEURL}getRecords/rep`);
      const data = response.data.data.map((element) => ({
        value: element._id,
        label: element.name,
      }));
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRepData();
      setRepData(data);
    };

    fetchData();
  }, []);
  
  // end get rep
  // delet

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
        .post(`${global.BASEURL}deleteRecord/groups`, {
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
      name: "Group Name",
      selector: (row) => row.name,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Assigned Reps",
      selector: (row) => row.rep_ids,
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
                    onClick={() => groupEditModal(row)}
                    outline
                    // onClick={toggleLargeModaledit}
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
  const statuss = [
    { label: "Active", value: "Active" },
    { label: "Un Active", value: "Un Active" },
  ];
 

  // Step 2: Add state for managing modal visibility
  const [editGroup, seteditGroup] = useState(false);

  const groupEditModal = (result) => {
    setDefaultData_(result);
    seteditGroup(!editGroup);
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
          Employees / <span style={{ fontSize: "20px" }}>Groups</span>
        </h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" outline onClick={toggleLargeModal}>
              Add Groups
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
                  <img className="icon_sizee" src={group_icon} alt="" />
                </div>
                <h5 className="modal_title">Add New Rep</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the rep which you want to add.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Group Name
                      </Label>
                      <Input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Row>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Assign Rep
                          </Label>
                          <Select
                            onChange={(selectedOption) => {
                              setRep_ids(
                                selectedOption ? selectedOption.value : null
                              );
                            }}
                            value={repData.find(
                              (option) => option.value === rep_ids
                            )}
                            isClearable={false}
                            classNamePrefix="select"
                            options={repData}
                          />
                        </Col>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Status
                          </Label>
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
              isOpen={editGroup}
              toggle={groupEditModal} 
              size="lg"
            >
              <ModalHeader
                toggle={groupEditModal} 
              ></ModalHeader>
              <ModalBody>
                <div className="icon_div_main mb-2">
                  <img className="icon_sizee" src={group_icon} alt="" />
                </div>
                <h5 className="modal_title">Edit New Rep</h5>
                <span className="modal_subtitle">
                  Enter the correct details of the rep which you want to edit.
                </span>

                <Form className="d-flex flex-column p-1">
                  <Row>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Group Name
                      </Label>
                      <Input
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={defaultData_?.name}
                        type="text"
                        placeholder="Name"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Row>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Assign Rep
                          </Label>
                          <Select
                            onChange={(selectedOption) => {
                              setRep_ids(
                                selectedOption ? selectedOption.value : null
                              );
                            }}
                            value={repData.find(
                              (option) => option.value === rep_ids
                            )}
                            isClearable={false}
                            classNamePrefix="select"
                            options={repData}
                          />
                        </Col>
                        <Col lg="6" md="12" className="mb-2">
                          <Label className="value_font input_label">
                            Status
                          </Label>
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
      {/* table satar */}
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

export default GroupsPage;
