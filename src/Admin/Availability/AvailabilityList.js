/* eslint-disable */
import '@styles/react/apps/app-users.scss'
import React, { useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap';
import { apiRequest } from '../../api/apirequest';
import { Edit, Trash } from 'react-feather';
import { Form, Input, Label } from 'reactstrap';
import AvailabilityTable from './AvailabilityTable';
import Select from 'react-select'

const AvailabilityList = () => {

    const [showdel, setShowdel] = useState(false);
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState();
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [days, setDays] = useState([])
    const [editDays, setEditDays] = useState()
    const [value, setValue] = useState()
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)

    const handleClosedel = () => setShowdel(false);
    const handleClose = () => setShow(false);
    const handleShow = (row) => {
        console.log(row)
        const day = row?.days
        for (let i = 0; i < day.length; i++) {
            day[i] === 'monday' ?
            setMonday(true)
            :
            day[i] === 'tuesday' ?
            setTuesday(true) 
            :
            day[i] === 'wednesday' ?
            setWednesday(true) 
            :
            day[i] === 'thursday' ?
            setThursday(true)
            :
            day[i] === 'friday' ? 
            setFriday(true)
            :
            null
        }
        setEditDays(day)
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

    const options = [
        { value: 'task 1', label: 'Task 1'},
        { value: 'task 2', label: 'Task 2'},
        { value: 'task 3', label: 'Task 3'},
      ]

    const data = [
        {
            task: 'Task 1',
            days: ['monday', 'tuesday', 'thursday']
        }
    ]
    const columns = [
        {
            name: 'Task',
            selector: (row) => row.task,
            sortable: "true",

        },
        {
            name: 'Days',
            selector: (row) => row.days,
            minWidth: '450px',
            sortable: "true",
            cell: (row) => (
                <div className='d-flex gap-1'>
                    {
                        row.days.map((item, index) => (
                            <div key={index}>
                                <span style={{ textTransform: 'capitalize' }}>{item}</span>
                            </div>
                        ))
                    }
                </div>
            )
        },
        {
            name: '',
            allowOverflow: false,
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-center  align-items-center gap-3 w-100 orderdiv'>
                        <div>
                            <Trash style={{ cursor: 'pointer' }} size={20} onClick={() => {
                                setShowdel(true)
                            }} />
                        </div>
                        <div>
                            <Edit style={{ cursor: 'pointer' }} onClick={() => handleShow(row)} size={20} />
                        </div>
                    </div>
                )
            }
        }
    ]
    return (
        <div>
            <AvailabilityTable columns={columns} data={data} tname={"Availability"} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Form className='d-flex flex-column p-1' >
                    <Label className='mt-3 label_font'>Tasks</Label>
                    <Select value={value ? value : options.filter(item => item.label === editData?.task)} options={options} onChange={(e) => setValue({value: e.value, label: e.label})}/>
                    <Label className='mt-2 label_font'>Day</Label>
                    <div className=''>
                        <Input type='checkbox' defaultChecked={monday ? true : false} onChange={(e) => setDays(prev => [...prev, e.target.value])} value='monday' />
                        <Label className='ms-1 value_font'>Monday</Label>
                    </div>
                    <div className='mt-1'>
                        <Input type='checkbox' defaultChecked={tuesday ? true : false} onChange={(e) => setDays(prev => [...prev, e.target.value])} value='tuesday' />
                        <Label className='ms-1 value_font'>Tuesday</Label>
                    </div>
                    <div className='mt-1'>
                        <Input type='checkbox' defaultChecked={wednesday ? true : false} onChange={(e) => setDays(prev => [...prev, e.target.value])} value='wednesday' />
                        <Label className='ms-1 value_font'>Wednesday</Label>
                    </div>
                    <div className='mt-1'>
                        <Input type='checkbox' defaultChecked={thursday ? true : false} onChange={(e) => setDays(prev => [...prev, e.target.value])} value='thursday' />
                        <Label className='ms-1 value_font'>Thursday</Label>
                    </div>
                    <div className='mt-1'>
                        <Input type='checkbox' defaultChecked={friday ? true : false} onChange={(e) => setDays(prev => [...prev, e.target.value])} value='friday' />
                        <Label className='ms-1 value_font'>Friday</Label>
                    </div>
                    <div className="col-3 ">
                        <Button disabled={loadingBtn ? true : false} type="submit" className="mt-2">
                            {
                                loadingBtn ?
                                    <Spinner color='white' size='sm' />
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

export default AvailabilityList
