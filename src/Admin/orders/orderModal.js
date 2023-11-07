/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, Button, Carousel, Form, Row, Col, Spinner } from 'react-bootstrap'
import './order.css'
import { apiRequest } from '../../api/apirequest'
const OrderModal = ({ showModal, onClose, id }) => {
    const handleClose = () => {
        onClose && onClose();
    };
    const [orders, setorders] = useState({
        area_in_sq: '',
        billing_email: '',
        billing_phone: '',
        city: '',
        cleaning_request: [],
        company: '',
        degree_of_polution: '',
        description: '',
        desired_date: '',
        first_name: '',
        floor: '',
        furniture_type: '',
        gender: '',
        images: [],
        last_name: '',
        no: '',
        object_type: '',
        postcode: '',
        profession: '',
        reason_cleaning: '',
        status: '',
        street: '',
        url: ''
    });

    const [isloading, setisLoading] = useState(false);
    const getdata = () => {
        setisLoading(true);
        const body = new FormData();
        body.append("type", "get_data");
        body.append("table_name", "orders");
        apiRequest({ body })
            .then(async (res) => {
                console.log(res);
                const specificOrder = res.data.find((order) => order.id === id);
                if (specificOrder) {
                    setorders(specificOrder);
                } else {
                    setorders('');
                    console.log("No order found with the specific ID");
                }
                setisLoading(false);

            })
            .catch((error) => {
                console.error(error);
                setisLoading(false);

            });
    };

    useEffect(() => {
        getdata()
    }, [])

    let cleaningRequest;
    try {
      cleaningRequest = JSON.parse(orders.cleaning_request);
    } catch (error) {
      cleaningRequest = [];
    }
    
    const cleaningRequestString = cleaningRequest.join(', ');
    
    
    return (
        <div>
            <Modal size='lg' show={showModal} onHide={handleClose}
                centered>
                <Modal.Header closeButton className='border-bottom-0' >
                    <Modal.Title className='fs-5 primary_color' >Order Discription</Modal.Title>
                </Modal.Header>
                {isloading ? (
                    <div className=' mt-3 d-flex justify-content-center align-items-center h-100 w-100' >
                        <Spinner animation="border" variant="dart" size="lg" /> 
                    </div>
                ):
                    (<Modal.Body className='fs_9 req_modal' >
                        <div>
                            <Col xs="12" className='mt-1'  >
                                <h6>
                                    Pictire of Cleaning:
                                </h6>
                            </Col>
                            <Col xs="12" className='' >
                                <Carousel className='w-75 d-flex mx-auto' interval={null}>
                                    {orders.images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={orders.url + image}
                                                alt={`Slide ${index + 1}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>
                        </div>
                        <Row >
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Desired Date:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.desired_date ? orders.desired_date : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Orders Status:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.status ? orders.status : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        First Name:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.first_name ? orders.first_name : " "}
                                    {orders.last_name}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Email:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.billing_email ? orders.billing_email : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Phone Number:
                                    </h6>
                                </Col>

                                <Col xs="12" className='colData' >
                                    {orders.billing_phone ? orders.billing_phone : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Gender:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.gender ? orders.gender : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Profession:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.profession ? orders.profession : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Street:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.street ? orders.street : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Street No:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.no ? orders.no : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        POSTCODE:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.postcode ? orders.postcode : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        City:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.city ? orders.city : " "}
                                </Col>
                            </div>

                            <div>
                                <div>
                                    <Col xs="12" className='mt-1'  >
                                        <h6>
                                            Object Type:
                                        </h6>
                                    </Col>
                                    <Col xs="12" className='colData' >
                                        {orders.object_type ? orders.object_type : " "}
                                    </Col>
                                </div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Floor:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.floor ? orders.floor : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Furniture Type:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.furniture_type ? orders.furniture_type : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Reason of Cleaning:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.reason_cleaning ? orders.reason_cleaning : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Area in Square:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.area_in_sq ? orders.area_in_sq : "0"}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Degree of Pollution:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.degree_of_polution ? orders.degree_of_polution : " "}
                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Cleaning Request:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >

                                {cleaningRequestString ? cleaningRequestString : ''}


                                </Col>
                            </div>
                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Company
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {orders.company ? orders.company : " "}
                                </Col>
                            </div>

                            <div>
                                <Col xs="12" className='mt-1'  >
                                    <h6>
                                        Description:
                                    </h6>
                                </Col>
                                <Col xs="12" className='colData' >
                                    {
                                        orders.description ? orders.description :
                                            " "}
                                </Col>
                            </div>

                        </Row>

                    </Modal.Body>)}

                <Modal.Footer className='border-top-0 pt-1' >
                    <Button variant='danger' className=" text-white w-100 text-center mt-4 rounded-5">Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default OrderModal