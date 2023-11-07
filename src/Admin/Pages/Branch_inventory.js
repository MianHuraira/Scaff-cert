import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
import "./table.css";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";
import inventory_order2 from "../../Admin/assests/side_icon/inventory_order2.png";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import {
  UncontrolledButtonDropdown,
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
} from "reactstrap";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

import { useHistory } from "react-router-dom";

const BranchInventory = () => {
  const history = useHistory();

  const queryParams = new URLSearchParams(history.location.search);
  const itemName = queryParams.get("bN");

  const [isLoading, setIsLoading] = useState(true);
  const [defaultData_, setDefaultData_] = useState("");

  const [name, setName] = useState("");
  const [branch_code, setBranch_code] = useState(itemName);
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [status, setStatus] = useState("Instock");


  // post data

  const postData = (e) => {
    e.preventDefault();

    if (!name || !branch_code || !quantity || !weight) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setName("");
    setBranch_code("");
    setQuantity("");
    setWeight("");
    // setStatus("");

    axios
      .post(`${global.BASEURL}createInventory`, {
        name,
        branch_code,
        quantity,
        weight,
        status,
      })
      .then(() => {
        toggaleInventory();
        getData();
        toast.success("Data added successfully.");
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
        toast.error("Failed to add data.");
      });
  };

  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getbranchInventory`, {
        branch_code: itemName,
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  let counter = 0;
  const columns = [
    {
      name: "Sr.no",
      selector: (row) => ++counter,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Item Name",
      selector: (row) => row.name,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Owned",
      selector: (row) => row.owned,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "In Stock",
      selector: (row) => row.quantity,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Weight (per Item)",
      selector: (row) => row.weight,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Total Weight",
      selector: (row) => row.weight * row.quantity,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "On Site",
      selector: (row) => row.quantity,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Status",
      cell: (row) => (
        <div className="d-flex align-items-center">
          {row.status === "Instock" ? (
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

  // edit client modal start

  const [addInventory, setAddInventory] = useState(false);

  const toggaleInventory = () => {
    setAddInventory(!addInventory);
  };

  return (
    <>
      <ToastContainer />

      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title">
          Branch / Branches /{" "}
          <span style={{ fontSize: "20px" }}>Inventory</span>
        </h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" onClick={toggaleInventory}>
              Add New Inventory
            </Button>
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

      {/* modal start */}

      {/* add modal inventroy */}

      <Modal isOpen={addInventory} toggle={toggaleInventory} size="lg">
        <ModalHeader toggle={toggaleInventory}></ModalHeader>
        <ModalBody>
          <div className="icon_div_main mb-2">
            <img className="icon_sizee" src={inventory_order2} alt="" />
          </div>
          <h5 className="modal_title">Add Inventory Item</h5>
          <span className="modal_subtitle">
            Enter the correct details of the item which you want to add.
          </span>

          <Form className="d-flex flex-column p-1">
            <Row>
              <Col className="mb-2" lg="12">
                <Label className="value_font input_label">Select Branch*</Label>
                <Input
                  onChange={(e) => setBranch_code(e.target.value)}
                  value={itemName}
                  readOnly
                  type="text"
                  placeholder="Item Name*"
                />
              </Col>
              <Col className="mb-2" lg="12">
                <Row>
                  <Col lg="6" md="12" className="mb-2">
                    <Label className="value_font input_label">Item Name*</Label>
                    <Input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      placeholder="Item Name*"
                    />
                  </Col>
                  <Col lg="6" md="12">
                    <Row>
                      <Col lg="6" md="12" className="mb-2">
                        <Label className="value_font input_label">
                          Quantity*
                        </Label>
                        <Input
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                          type="number"
                          placeholder="Quantity*"
                        />
                      </Col>
                      <Col lg="6" md="12" className="mb-2">
                        <Label className="value_font input_label">
                          Weight (kg) Per Item*
                        </Label>
                        <Input
                          onChange={(e) => setWeight(e.target.value)}
                          value={weight}
                          type="number"
                          placeholder="Weight (kg) Per Item*"
                        />
                      </Col>
                    </Row>
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
                Create
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      {/* ended modal  */}
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

export default BranchInventory;
