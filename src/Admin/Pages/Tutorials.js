import { React, useState, useEffect , useRef} from "react";
import "@styles/react/apps/app-users.scss";
import './table.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import ReactPlayer from 'react-player'

import { MoreHorizontal } from "react-feather";
import {
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Label,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { Card, Col, Row } from "react-bootstrap";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";

const Tutorials = () => {


  // get data

  const [isLoading, setIsLoading] = useState(true);

  // show data start code
  const [data, setData] = useState([]);

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/tutorials`)
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

 


  return (
    <>
      <ToastContainer />

      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title"> Tutorials</h5>      
      </div>
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
        <Row className="gx-5">
          {data.map((item, index) => {
            return (
              <Col lg="4" md="6" sm="6" xs="12" key={index} className="mb-2">
                <Card key={index} style={{height:"94%"}}>
                  <div className="video_div">
                    <ReactPlayer  url={item.url} controls={true} />
                  </div>
                  <CardBody>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="head_title truncate-paragraph_head">{item.title}</h5>
                    </div>
                    <div className="truncate-paragraph">
                      <p className="modal_subtitle">{item.description}</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default Tutorials;
