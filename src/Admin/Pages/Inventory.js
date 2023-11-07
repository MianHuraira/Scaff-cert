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
import branches2 from "../../Admin/assests/side_icon/branches2.png";

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

const InventoryPage = () => {
  let data = [
    {
      srno: "09",
      Branch_Name: "Eleven Dev-Branch 1",
      item_name: "Alum Ladder 3.6m",
      owned: "30 pcs",
      in_stock: "15 pcs",
      weight_item: "10 kg",
      total_weight: "300 kg",
      on_site: "15 pcs",
      status: "Instock",
    },
    {
      srno: "09",
      Branch_Name: "Eleven Dev-Branch 1",
      item_name: "Alum Ladder 3.6m",
      owned: "30 pcs",
      in_stock: "15 pcs",
      weight_item: "10 kg",
      total_weight: "300 kg",
      on_site: "15 pcs",
      status: "out of stock",
    },
    
  ];


  const title = "Clients";
  const columns = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Item Name",
      selector: (row) => row.item_name,
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
      selector: (row) => row.in_stock,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Weight (per Item)",
      selector: (row) => row.weight_item,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Total Weight",
      selector: (row) => row.total_weight,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "On Site",
      selector: (row) => row.on_site,
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
                <DropdownItem>
                     <span className="align-middle ms-50">Inventory</span>
                </DropdownItem>
                <DropdownItem>
                  <span className="align-middle ms-50">Damage Stock</span>
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
  const selectState = [
    { label: "NSW", value: "NSW" },
    { label: "abc", value: "abc" },
    { label: "asd", value: "asd" },
  ];
  const selectStaus = [
    { label: "Active", value: "Active" },
    { label: "Un Active", value: "Un Active" },
  ];

  // Step 2: Add state for managing modal visibility
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  const toggleLargeModal = () => {
    setIsLargeModalOpen(!isLargeModalOpen);
  };

  return (
    <>
      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title"> Branch / <span style={{fontSize:'20px'}}>Branches / Inventory</span></h5>
        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" outline onClick={toggleLargeModal}>
            Add New Inventory
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
                      <Input type="text" placeholder="Name" />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                      Branch Code
                      </Label>
                      <Input type="number" placeholder="Branch Code" />
                    </Col>

                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                      Location
                      </Label>
                      <Input
                        type="text"
                        placeholder="Location"
                      />
                    </Col>
                    <Col className="mb-2" lg="6" md="12">
                      <Label className="value_font input_label">
                        Phone Number
                      </Label>
                      <Input type="tel" placeholder="Phone Number" />
                    </Col>
                  </Row>
                  <div className="mx-auto">
                    <Button
                      onClick={toggleLargeModal}
                      type="submit"
                      className="mt-2 default_btn"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </ModalBody>
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
      <div className="">
        <ClientDataTable columns={columns} data={data} title={title} />
      </div>
    </>
  );
};

export default InventoryPage;
