import React, { useEffect, useState } from "react";
import { Accordion, Button, Form, Table } from "react-bootstrap";
import { AccordionBody, AccordionHeader, Col, Input, Row, } from "reactstrap";
import './client.css'
import SubPlaceTable from "./subplacetable";
function Subplace() {
  const [showSubmoduleForm, setShowSubmoduleForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  let [data, setData] = useState([]);
  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [actionList, setActionList] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      placeName: placeName,
      placeType: placeType,
      actionList: actionList.split("\n").filter((item) => item.trim() !== ""),
    });
  };
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, inputValue]);
    setInputValue("");
  };

  const handleRemoveItem = (index) => {
    setItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };
  const showtable = () => {
    setShowSubmoduleForm(false);
    setShowTable(true);
    let newData = {
      name: "ABC",
      placename: "ABC",
      action: "Action 1, Action2",
    };
    // data.push(newData);
    setData([...data, newData]);

  }
  const ShowForm = () => {
    setShowSubmoduleForm(true);
    setShowTable(false);
    setData([])
  }


  const columns = [
    {
      name: 'Type',
      selector: (row) => row.name,
      sortable: "true",
    },
    {
      name: 'PlaceName',
      selector: (row) => row.placename,
      sortable: "true",

    }, {
      name: 'Actions',
      selector: (row) => row.action,
      sortable: "true",
    }
  ]


  return (
    <div className="App">
      <Row>
        <Col md={6}>
          <Accordion >
            <Accordion.Item eventKey="0"  >
              <Accordion.Header>Application</Accordion.Header>
              <Accordion.Body>
                <Button variant="white" className="text-start w-100 child" onClick={() => ShowForm()}>
                  Child 1
                </Button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Documents</Accordion.Header>
              <Accordion.Body>
                <Button variant="white" className="text-start w-100 child" onClick={showtable} >
                  Child 1
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col md={6}>
          <Button variant='primary' className="float-end mb-1" onClick={() => ShowForm()}>Add Subplace</Button>
          {
            showSubmoduleForm ?
              <>
                <Form onSubmit={handleSubmit} className="mt-1" style={{ clear: "both" }}>
                  <Form.Group controlId="placeName">
                    <Form.Label>Place Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter place name"
                      className="mb-1"
                      value={placeName}
                      onChange={(event) => setPlaceName(event.target.value)}

                    />
                  </Form.Group>

                  <Form.Group controlId="placeType">
                    <Form.Label>Place Type</Form.Label>
                    <Form.Control
                      className="mb-1"
                      type="text"
                      placeholder="Enter place type"
                      value={placeType}
                      onChange={(event) => setPlaceType(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="actionList">
                    <Form.Label>Action List</Form.Label>
                    <div className="d-flex justify-content-between align-items-center mb-1" >
                      <Form.Control
                        className=""
                        type="text"
                        placeholder="Action List"
                        value={inputValue} onChange={handleInputChange}
                      />
                      <Button onClick={handleAddItem} className="rounded-circle p-0 fs-3 ms-1 " style={{ width: "33px", height: "30px" }}  >+</Button>
                    </div>
                    <ul>
                      {items.map((item, index) => (
                        <li key={index} className="item_list my-1 d-flex justify-content-between align-items-center">

                          {item}  <Button onClick={() => handleRemoveItem(index)} className="rounded-circle ms-1 p-0 fs-3" style={{ width: "30px", height: "30px" }}  >-</Button>
                        </li>
                      ))}
                    </ul>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </>
              : null
          }
        </Col>
        <div className="mt-3" >
          {showTable ?
            <>
              <SubPlaceTable className="mt-2" columns={columns} data={data} />
            </>
            : null}
        </div>


      </Row>
    </div>
  );
}
export default Subplace;