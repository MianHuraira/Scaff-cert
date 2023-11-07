import "@styles/react/apps/app-users.scss";
// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import "./table.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import inventory_order2 from "../../Admin/assests/side_icon/inventory_order2.png";

import {
  Form,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import axios from "axios";
// tostify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

// drag and drop code

import { useDrag, useDrop } from "react-dnd";

const DraggableCol = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: "COL",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "COL",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <Col
      className="mb-2"
      xl="3"
      lg="4"
      md="6"
      key={index}
      ref={(node) => ref(drop(node))}
    >
      <div className="d-flex align-items-center">
        <div className="branc_count">
          <h5>{item.quantity}</h5>
        </div>
        <div className="branc_contnt">
          <h5>
            {item.name} {item.weight}
          </h5>
        </div>
      </div>
    </Col>
  );
};

const InventoryOrder = () => {
  const [name, setName] = useState("");
  const [branch_code, setBranch_code] = useState("");
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

  const [data, setData] = useState([]);

  // for spiner

  const [isLoading, setIsLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("all"); // Default value "all" for All Branches

  function getData() {
    setIsLoading(true);

    axios
      .post(`${global.BASEURL}getInventory`)
      .then((response) => {
        const data = response.data.data;
        const filteredData =
          selectedBranch === "all"
            ? data
            : data.filter((item) => item.branch_code === selectedBranch);
        setData(filteredData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [selectedBranch]);

  // end

  // dynamic branch

  const [branchData, setBranchData] = useState([]);

  function branchDataGet() {
    axios
      .post(`${global.BASEURL}getBranches`)
      .then((res) => {
        setBranchData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  useEffect(() => {
    branchDataGet();
  }, []);

  // Step 2: Add state for managing modal visibility
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  const toggleLargeModal = () => {
    setIsLargeModalOpen(!isLargeModalOpen);
  };

  // drag code

  const moveItem = (fromIndex, toIndex) => {
    const updatedData = [...data];
    const [movedItem] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedItem);
    setData(updatedData);
  };

  return (
    <>
      <ToastContainer />

      <div className="d-flex align-items-center justify-content-between md_column mt-3 mb-3">
        <h5 className="head_title">
          Inventory Order
          <span style={{ fontSize: "20px" }}>/ Inventory Sort Order</span>
        </h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" onClick={toggleLargeModal}>
              Add New Inventory
            </Button>
          </div>
          <div style={{ width: "12rem" }} className="ms-2">
            <Select
              onChange={(selectedOption) => {
                setSelectedBranch(selectedOption.value);
              }}
              isClearable={false}
              classNamePrefix="select"
              options={[
                { label: "All Branches", value: "all" }, // Custom option
                ...branchData.map((branch) => ({
                  label: branch.name,
                  value: branch.name,
                })),
              ]}
            />
          </div>

          {/* add  modal */}
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
                <img className="icon_sizee" src={inventory_order2} alt="" />
              </div>
              <h5 className="modal_title">Add Inventory Item</h5>
              <span className="modal_subtitle">
                Enter the correct details of the item which you want to add.
              </span>

              <Form className="d-flex flex-column p-1">
                <Row>
                  <Col className="mb-2" lg="12">
                    <Label className="value_font input_label">
                      Select Branch*
                    </Label>
                    <Select
                      onChange={(selectedOption) => {
                        setBranch_code(selectedOption.value);
                      }}
                      isClearable={false}
                      classNamePrefix="select"
                      options={branchData.map((branch) => ({
                        label: branch.name,
                        value: branch.name,
                      }))}
                    />
                  </Col>
                  <Col className="mb-2" lg="12">
                    <Row>
                      <Col lg="6" md="12" className="mb-2">
                        <Label className="value_font input_label">
                          Item Name*
                        </Label>
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
        </div>
      </div>
      <div>
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
            <>
              <Row>
                {data.map((item, index) => (
                  <DraggableCol
                    key={index}
                    item={item}
                    index={index}
                    moveItem={moveItem}
                  />
                ))}
              </Row>
              <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
                <button className="default_btn sub_btn">Save</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryOrder;
