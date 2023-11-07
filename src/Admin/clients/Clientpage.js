import '@styles/react/apps/app-users.scss'
import { Breadcrumb, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react'
import ClientDataTable from './ClientDataTable';
import './client.css';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, FileText, Trash, Edit2 } from 'react-feather'



const Clientpage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  let [data, setData] = useState([]);
  const handleShow = () => setShow(true);

  const [formData2, setFormData] = useState({
    clientname: '',
    siret: '',
    phnum: '',
    Email: '',
    address: '',
    locality: '',
    country: '',
    region: '',
    zipcode: '',
  });
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData2, [id]: value });

  };
  const handleSubmit = (event) => {
    let newData = {
      ClientName: formData2.clientname,
      Siret: formData2.siret,
      email: formData2.Email,
      PhoneNumber: formData2.phnum,
      Address: formData2.address,
      Locality: formData2.locality,
      Country: formData2.country,
      Region: formData2.region,
      ZipCode: formData2.zipcode,

    };
    setData([...data, newData]);
    event.preventDefault();
    formData2.clientname = '';
    formData2.siret = '';
    formData2.Email = '';
    formData2.phnum = '';
    formData2.address = '';
    formData2.locality = '';
    formData2.country = '';
    formData2.zipcode = '';
    formData2.region = '';
    handleClose();
  };


  const columns = [
    {
      name: 'Client Name',
      selector: (row) => row.ClientName,
      sortable: "true",
    },
    {
      name: 'Siret',
      selector: (row) => row.Siret,
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
      name: 'Phone Number',
      selector: (row) => row.PhoneNumber,
      sortable: "true",
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: "true",
    },
    {
      name: '',
      allowOverflow: true,
      maxWidth: "3rem",
      minWidth: "2rem",
      cell: () => {
        return (
          <div className='d-flex justify-content-end w-100'>
            <UncontrolledDropdown className="" >
              <DropdownToggle className='pe-1 ' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <Link to="./client-edit" className='btn btn-white p-0 m-0 w-100' >
                    <Edit2 size={15} />
                    <span className='align-middle ms-50 pe-2 '>Edit</span></Link>
                </DropdownItem>
                <DropdownItem>
                  <Trash size={15} />
                  <span className='align-middle ms-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
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
          <Form.Group className='mt-1' controlId="clientname">
            <Form.Label className='fw-bold' >
              Client Name
            </Form.Label>
            <Form.Control type="text" value={formData2.clientname} onChange={handleInputChange} placeholder="Client Name" autoFocus />
          </Form.Group>
          <Form.Group className='mt-1' controlId="siret">
            <Form.Label className='fw-bold' >
              Siret
            </Form.Label>
            <Form.Control type="text" value={formData2.siret} onChange={handleInputChange} placeholder="Siret" />
          </Form.Group>
          <Form.Group className='mt-1' controlId="address">
            <Form.Label className='fw-bold' >
              Address Line
            </Form.Label>
            <Form.Control type="text" value={formData2.address} onChange={handleInputChange} placeholder="Address Line" />
          </Form.Group>
          <Row>
            <Col md>
              <Form.Group className='mt-1' controlId="locality">
                <Form.Label className='fw-bold' >
                  Locality
                </Form.Label>
                <Form.Control type="text" value={formData2.locality} onChange={handleInputChange} placeholder="Enter Locality" />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className='mt-1' controlId="country">
                <Form.Label className='fw-bold' >
                  Country
                </Form.Label>
                <Form.Control type="text" value={formData2.country} onChange={handleInputChange} placeholder="Enter Country" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mt-1' controlId="region">
                <Form.Label className='fw-bold' >
                  Region
                </Form.Label>
                <Form.Control type="text" value={formData2.region} onChange={handleInputChange} placeholder="Enter Region" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mt-1' controlId="zipcode">
                <Form.Label className='fw-bold' >
                  Zip Code
                </Form.Label>
                <Form.Control type="text" value={formData2.zipcode} onChange={handleInputChange} placeholder="Zip Code" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className='mt-1' controlId="phnum">
            <Form.Label className='fw-bold' >
              Phone Number
            </Form.Label>

            <Form.Control type="tel" value={formData2.phnum} onChange={handleInputChange} placeholder="Phone Number" />

          </Form.Group>

          <Form.Group className='mt-1' controlId="Email">
            <Form.Label className='fw-bold' >
              Email
            </Form.Label>
            <Form.Control type="email" value={formData2.Email} onChange={handleInputChange} placeholder="Email" />
          </Form.Group>
          <Button variant="light" className='mt-2 mb-1' onClick={handleClose} type='button' >
            Cancel
          </Button>
          <Button variant="primary" className='mt-2 mb-1 ms-2' type='submit'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    {/* Modal End */}

    <div className='app-user-list'>
      <Breadcrumb  >
        {/* <Breadcrumb.Item href="./dashboard">Dashboard</Breadcrumb.Item> */}
        <Breadcrumb.Item active>Client</Breadcrumb.Item>
      </Breadcrumb>
      <Button className='btn btn-primary float-end mb-2' onClick={handleShow} >+ Add Client </Button>

      <div className="mt-2 " style={{ clear: "both" }} >
        <ClientDataTable columns={columns} data={data} /></div>
    </div>
  </>
  )
}

export default Clientpage
