import '@styles/react/apps/app-users.scss'
import { Breadcrumb, Button, Modal, Form } from 'react-bootstrap';
import React, { useState, useMemo } from 'react'
import UserDataTable from './UserDataTable';
import './user.css';

import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Trash, Edit2 } from 'react-feather'


const Userpage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    frstname: '',
    lastname: '',
    phnum: '',
    Email: '',
  });


  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });

  };
  // -----------------
  const handleSubmit = (event) => {
    let newData = {
      name: formData.frstname,
      firstname: formData.lastname,
      email: formData.Email,
      phoneNumber: formData.phnum,
    };
    setData([...data, newData]);
    event.preventDefault();
    formData.frstname = '';
    formData.lastname = '';
    formData.Email = '';
    formData.phnum = '';
    handleClose();
  };
data=[
  {
    name:"ABC",
    firstname:"XYZ",
    email:'abc@abc.com',
    phoneNumber:"+49000020"
  },
  {
    name:"ABC",
    firstname:"XYZ",
    email:'abc@abc.com',
    phoneNumber:"+49000020"
  },
  {
    name:"ABC",
    firstname:"XYZ",
    email:'abc@abc.com',
    phoneNumber:"+49000020"
  },
  {
    name:"ABC",
    firstname:"XYZ",
    email:'abc@abc.com',
    phoneNumber:"+49000020"
  }
]

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: "true",
    },
    {
      name: 'Firstname',
      selector: (row) => row.firstname,
      sortable: "true",

    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: "true",

    },
    {
      name: 'Phone Number',
      selector: (row) => row.phoneNumber,
      sortable: "true",
    },
    {
      name: '',
      allowOverflow: false,
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
                  <Link to="./" className='btn btn-white p-0 m-0 w-100' >
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


  // -----------------
  const data1 = useMemo(() => {
    return data
  }, [data])

  return (<>
    {/* Modal */}
    <Modal show={show} onHide={handleClose} className="rounded-3" size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">Create User</Modal.Title>
        <Button variant='light' className="close_btn" onClick={handleClose}>X</Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1 mt-3" controlId="frstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control type="text" placeholder="First Name" value={formData.frstname} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-1" controlId="lastname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control type="text" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-1" controlId="phnum">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="03xxxxxxxxx" value={formData.phnum} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-1" controlId="Email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={formData.Email} onChange={handleInputChange} />
          </Form.Group>

          <Button variant="light" className='mt-1' onClick={handleClose} type='button' >
            Cancel
          </Button>
          <Button variant="primary" className='ms-2 mt-1' type='submit' >
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    <div className='app-user-list'>
      <Breadcrumb  >
        {/* <Breadcrumb.Item href="./dashboard">Dashboard</Breadcrumb.Item> */}
        {/* <Breadcrumb.Item active>User</Breadcrumb.Item> */}
      </Breadcrumb>
      <Button className='btn btn-primary float-end mb-2' onClick={handleShow} >+ Create user </Button>

      <div className="mt-2 " style={{ clear: "both" }} >
        <UserDataTable data={data1} columns={columns} /></div>
    </div>
  </>
  )
}

export default Userpage
