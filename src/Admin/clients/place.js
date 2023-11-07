import React from 'react';
import { Button, Col, Row, Form, Modal } from 'react-bootstrap';
import { useState } from 'react'
import PlaceDataTable from './PlaceDataTable';

import { Trash } from 'react-feather'

const ClientPlace = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [data, setData] = useState([]);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [formData, setFormData] = useState({
        placename: '',
        placetype: '',
        address: '',
        locality: '',
        country: '',
        region: '',
        zipcode: '',
    });
    function handleCheckboxClick(checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        if (selectedCheckbox === checkbox) {
            checkbox.checked = false;
            setSelectedCheckbox(null);
            setFormData({
                ...formData,
                placetype: ''
            });
        } else {
            if (selectedCheckbox) {
                selectedCheckbox.checked = false;
            }

            checkbox.checked = true;
            setSelectedCheckbox(checkbox);
            if (checkbox.id == 1) {
                setFormData({
                    ...formData,
                    placetype: "Company"
                });
            } else if (checkbox.id == 2) {
                setFormData({
                    ...formData,
                    placetype: "Invidual"
                });
            } else if (checkbox.id == 3) {
                setFormData({
                    ...formData,
                    placetype: "Co-Ownership"
                });
            } 

        }
    }
   
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });

    };
    const handleSubmit = (event) => {

        let newData = {
            PlaceName: formData.placename,
            PlaceType:  formData.placetype,
            Address: formData.address,
            Locality: formData.locality,
            Country: formData.country,
            Region: formData.region,
            ZipCode: formData.zipcode,

        };
        setData([...data, newData]);
        event.preventDefault();
        console.log(formData);
        formData.placename = '';
        formData.placetype = '';
        formData.address = '';
        formData.locality = '';
        formData.country = '';
        formData.zipcode = '';
        formData.region = '';
        handleClose();
    };


    const columns = [
        {
            name: 'Place Name',
            selector: (row) => row.PlaceName,
            sortable: "true",
        },
        {
            name: 'Place Type',
            selector: (row) => row.PlaceType,
            sortable: "true",
        },
        {
            name: 'Address Line',
            selector: (row) => row.Address,
            sortable: "true",

        },
        {
            name: 'Locality',
            selector: (row) => row.Locality,
            sortable: "true",
        },
        {
            name: 'Country',
            selector: (row) => row.Country,
            sortable: "true",
        },
        {
            name: 'Region',
            selector: (row) => row.Region,
            sortable: "true",
        },

        {
            name: 'Zip Code',
            selector: (row) => row.ZipCode,
            sortable: "true",
        },
        {
            name: '',
            allowOverflow: true,
            sortable: false,
            maxWidth: "6vw",
            minWidth: "4vw",
            cell: () => {
                return (
                    <Button variant='light' className='px-1' >
                        <Trash size={15} />
                    </Button>
                )
            }

        }

    ]


    return (<>
        <Modal show={show} onHide={handleClose} className="rounded-3" size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">Create Client</Modal.Title>
                <Button variant='light' className="close_btn" onClick={handleClose}>X</Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Group className='mt-1' controlId="placename">
                        <Form.Label className='fw-bold'  >
                            Place Name
                        </Form.Label>
                        <Form.Control type="text" value={formData.placename} onChange={handleInputChange} placeholder="Enter place name" />
                    </Form.Group>

                    <Form.Group className='mt-1' controlId="placetype">
                        <Form.Label className='fw-bold' >
                            Place Type
                        </Form.Label>
                        <div className="mt-1 ms-1">
                            <Form.Check
                                inline
                                label="Company"
                                type="checkbox"
                                id="1"
                                onClick={() => handleCheckboxClick(1)}
                            />
                            <Form.Check
                                inline
                                label="Individual"
                                type="checkbox"
                                id="2"
                                onClick={() => handleCheckboxClick(2)}
                            />
                            <Form.Check
                                inline
                                label="Co-Ownership"
                                type="checkbox"
                                id="3"
                                onClick={() => handleCheckboxClick(3)}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className='mt-1' controlId="address">
                        <Form.Label className='fw-bold' >
                            Address Line
                        </Form.Label>
                        <Form.Control type="text" value={formData.address} onChange={handleInputChange} placeholder="Enter address line" />
                    </Form.Group>

                    <Form.Group className='mt-1' controlId="locality">
                        <Form.Label className='fw-bold' >
                            Locality
                        </Form.Label>
                        <Form.Control type="text" value={formData.locality} onChange={handleInputChange} placeholder="Enter locality" />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className='mt-1' controlId="region">
                                <Form.Label className='fw-bold' >
                                    Region
                                </Form.Label>
                                <Form.Control type="text" value={formData.region} onChange={handleInputChange} placeholder="Enter Region" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className='mt-1' controlId="zipcode">
                                <Form.Label className='fw-bold' >
                                    Zip Code
                                </Form.Label>
                                <Form.Control type="text" value={formData.zipcode} onChange={handleInputChange} placeholder="Zip Code" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className='mt-1' controlId="country">
                        <Form.Label className='fw-bold' >
                            Country
                        </Form.Label>
                        <Form.Control type="text" value={formData.country} onChange={handleInputChange} placeholder="Enter country" />
                    </Form.Group>
                    <Button variant="light" className='mt-2 mb-1' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" className='mt-2 mb-1 ms-2' type='submit'>
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        <Button className='float-end mt-1 mb-2' onClick={handleShow} >Add Place</Button>
        <div className='border p-2 mt-2 shadow-sm w-100 rounded-1' style={{ clear: "both" }}  >
            <PlaceDataTable columns={columns} data={data} />
        </div>
    </>)
}

export default ClientPlace;