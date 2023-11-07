import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
const ClientDetail = () => {
    return (
        <>
            <div className='border py-2 px-md-5 px-2 mt-2 shadow-sm w-100 h-50 rounded-1' >
                <Form className='' >
                    <Form.Group className='mt-1' controlId="formClientName">
                       <Form.Label className='fw-bold' >
                            Client Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Client Name" autoFocus />
                    </Form.Group>

                    <Form.Group className='mt-1' controlId="formLocality">
                       <Form.Label className='fw-bold' >
                            Siret
                        </Form.Label>
                        <Form.Control type="text" placeholder="Siret" />
                    </Form.Group>
                    <Form.Group className='mt-1' controlId="formAddressLine">
                       <Form.Label className='fw-bold' >
                            Address Line
                        </Form.Label>
                        <Form.Control type="text" placeholder="Address Line" />
                    </Form.Group>

                    <Form.Group className='mt-1' controlId="formLocality">
                       <Form.Label className='fw-bold' >
                            Locality
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Locality" />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className='mt-1' controlId="formRegion">
                               <Form.Label className='fw-bold' >
                                    Region
                                </Form.Label>
                                <Form.Control type="text" placeholder="Enter Region" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className='mt-1' controlId="formZipCode">
                               <Form.Label className='fw-bold' >
                                    Zip Code
                                </Form.Label>
                                <Form.Control type="text" placeholder="Zip Code" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className='mt-1' controlId="formCountry">
                       <Form.Label className='fw-bold' >
                            Country
                        </Form.Label>

                        <Form.Control type="text" placeholder="Enter Country" />

                    </Form.Group>

                    <Form.Group className='mt-1' controlId="formPhone">
                       <Form.Label className='fw-bold' >
                            Phone Number
                        </Form.Label>

                        <Form.Control type="tel" placeholder="Phone Number" />

                    </Form.Group>

                    <Form.Group className='mt-1' controlId="formEmail">
                       <Form.Label className='fw-bold' >
                            Email
                        </Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Button variant="primary" className='mt-2' role="button">
                        Save
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default ClientDetail;