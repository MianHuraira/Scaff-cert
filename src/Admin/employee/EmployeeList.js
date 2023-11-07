/* eslint-disable no-unused-vars */
import '@styles/react/apps/app-users.scss'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap';
import { apiRequest } from '../../api/apirequest';
import EmployeeTable from './EmployeeTable';
import OrderModal from '../orders/orderModal';
import { Edit, Trash } from 'react-feather';
import { Form, Input, Label } from 'reactstrap';
import InputPasswordToggle from '@components/input-password-toggle'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './employee.css'

const EmployeeList = () => {
  const [orders, setorders] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [orderId, setorderId] = useState(false);
  const [showdel, setShowdel] = useState(false);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [phone, setPhone] = useState(); 

  const handleClosedel = () => setShowdel(false);
  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    console.log(row)
    setShow(true)
    setEditData(row) 
};
const handleDelete = async () => {
    // let data = await DelInventory(delId)
    setShowdel(false)
    // setForEdit(!forEdit)
    // toast.success('Deleted successfully')
}
  const [isloading, setisLoading] = useState(false);

//   const getAllData = () => {
//     setisLoading(true);

//     const body = new FormData();
//     body.append("type", "get_data");
//     body.append("table_name", "orders");
//     apiRequest({ body })
//       .then(async (res) => {
//         console.log(res);
//         const filteredServices = res.data.filter((service) => {
//           return Object.values(service).every((field) => field !== null);
//         });

//         setorders(filteredServices);
//         setisLoading(false);

//       })
//       .catch((error) => {
//         setisLoading(false);
//         console.error(error);
//       });
//   }
//   useEffect(() => {
//     getAllData();
//   }, [])
const data = [
    {
        name: 'ahmad',
        email: 'ahmad@gmail.com',
        phone: '123',
        address: 'gkjhjhjk',
        speciality: 'none',
        experience: '2 years'
    }
]
  const columns = [

    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: "true",

    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: "true",

    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: "true",
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: "true",
    },
    {
        name: 'Speciality',
        selector: (row) => row.speciality,
        sortable: "true",
    },
    {
        name: 'Experience',
        selector: (row) => row.experience,
        sortable: "true",
    },
    {
      name: '',
      allowOverflow: false,
      cell: (row) => {
        return (
          <div className='d-flex justify-content-center  align-items-center gap-3 w-100 orderdiv'>
            <div>
                <Trash style={{cursor: 'pointer'}} size={20} onClick={() => {
                                setShowdel(true)
                            }}/>
            </div>
            <div>
                <Edit style={{cursor: 'pointer'}} onClick={() => handleShow(row)} size={20}/>
            </div>
          </div>
        )
      }
    }
  ]
  return (
    <div>
          <EmployeeTable columns={columns} data={data} tname={"Employee"} />
          <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Form className='d-flex flex-column p-1' >
                <Label className='mt-1 label_font'>Name</Label>
                <Input defaultValue={editData?.name} type='text' name='name' placeholder='Enter your name'/>
                <Label className='mt-1 label_font'>Email</Label>
                <Input defaultValue={editData?.email} type='email' name='email' placeholder='johndoe@gmail.com'/>
                <Label className='mt-1 label_font'>Phone</Label>
                <PhoneInput
                     containerClass='custom-input'
                     inputClass='custom-input'
                     name='phone'
                     value={phone ? phone : editData?.phone}
                     buttonStyle={{
                       border: 'none'
                     }}
                     inputStyle={{
                       width: '100%',
                       height: 42,
                       boxShadow: 'none',
                       border: 'none'
                     }}
                     inputProps={{
                       name: 'phone'
                     }}
                     onChange={(e) => setPhone(e)}
                  />
                <Label className='mt-1 label_font'>Address</Label>
                <Input defaultValue={editData?.address} type='text' name='address' placeholder='Enter address'/>
                <Label className='mt-1 label_font'>Speciality</Label>
                <Input defaultValue={editData?.speciality} type='text' name='speciality' placeholder='Enter speciality'/>
                <Label className='mt-1 label_font'>Experience</Label>
                <Input defaultValue={editData?.experience} type='text' name='experience' placeholder='2 years'/>
                <div className="col-3 ">
                <Button disabled={loadingBtn ? true : false} type="submit" className="mt-2">
                        {
                        loadingBtn ? 
                        <Spinner color='white' size='sm'/>
                        :
                        'Submit'
                        }
                    </Button>
                </div>
            </Form>
            </Modal>
            <Modal show={showdel} onHide={handleClosedel}>
                <Modal.Header closeButton>
                </Modal.Header>
                <div className="text-center py-1" style={{ marginLeft: "1.6rem" }}>
                    <h3 className='fs-1'>Are You Sure..?</h3>

                </div>
                <div style={{ marginLeft: "1.9rem" }} className="d-flex pb-2 align-items-center justify-content-around">
                    <Button onClick={() => setShowdel(false)} variant='primary'>Cancel</Button>
                    <Button onClick={handleDelete} variant='danger'>Okay</Button>
                </div>
            </Modal>
    </div>
  )
}

export default EmployeeList
