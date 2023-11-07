/* eslint-disable no-unused-vars */
import '@styles/react/apps/app-users.scss'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap';
import { apiRequest } from '../../api/apirequest';
import { Edit, Trash } from 'react-feather';
import { Form, Input, Label } from 'reactstrap';
import ServiceTable from './ServiceTable';

const ServiceList = () => {
  const [showdel, setShowdel] = useState(false);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState();
  const [loadingBtn, setLoadingBtn] = useState(false); 
  const [loading, setLoading] = useState(false); 
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
        service_name: 'test Service',
        description: 'test Service desc',
        fee: '123',
        duration: '12:20'
    }
]
  const columns = [

    {
      name: 'Service Name',
      selector: (row) => row.service_name,
      sortable: "true",

    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: "true",

    },
    {
      name: 'fee',
      selector: (row) => row.fee,
      sortable: "true",
    },
    {
      name: 'Duration',
      selector: (row) => row.duration,
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
          <ServiceTable loading={loading} columns={columns} data={data} tname={"Service"} />
          <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Form className='d-flex flex-column p-1' >
                <Label className='mt-3 label_font'>Service Name</Label>
                <Input defaultValue={editData?.service_name} type='text' name='sName' placeholder='Enter service name'/>
                <Label className='mt-2 label_font'>Description</Label>
                <Input defaultValue={editData?.description} type='textarea' name='desc' placeholder='Description'/>
                <Label className='mt-2 label_font'>Fee</Label>
                <Input defaultValue={editData?.fee} type='number' name='fee' placeholder='33'/>
                <Label className='mt-2 label_font'>Duration</Label>
                <Input defaultValue={editData?.duration} type='time' name='duration' placeholder='Enter duration'/>
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

export default ServiceList
