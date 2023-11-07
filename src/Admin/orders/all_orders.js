/* eslint-disable no-unused-vars */
import '@styles/react/apps/app-users.scss'
import PendingOrderTable from './orderDataTable';
import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import './order.css';
import { apiRequest } from '../../api/apirequest';
import OrderModal from './orderModal';

const AllOrders = () => {
  const [orders, setorders] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [orderId, setorderId] = useState(false);

  const handleOpenModal = (id) => {
    console.log(id);
    setorderId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);

  };
  const [isloading, setisLoading] = useState(false);

  const getAllData = () => {
    setisLoading(true);

    const body = new FormData();
    body.append("type", "get_data");
    body.append("table_name", "orders");
    apiRequest({ body })
      .then(async (res) => {
        console.log(res);
        const filteredServices = res.data.filter((service) => {
          return Object.values(service).every((field) => field !== null);
        });

        setorders(filteredServices);
        setisLoading(false);

      })
      .catch((error) => {
        setisLoading(false);
        console.error(error);
      });
  }
  useEffect(() => {
    getAllData();
  }, [])
  const columns = [

    {
      name: 'name',
      selector: (row) => row.first_name,
      sortable: "true",

    },
    {
      name: 'Email',
      selector: (row) => row.billing_email,
      sortable: "true",

    },
    {
      name: 'Phone Number',
      selector: (row) => row.billing_phone,
      sortable: "true",
    },
    {
      name: 'Address',
      selector: (row) => row.street + " " + row.city,
      sortable: "true",
    },
    {
      name: 'Service',
      selector: (row) => {
        const cleaningRequest = JSON.parse(row.cleaning_request);
        return cleaningRequest.length > 0 ? cleaningRequest.join(', ') : 'null';
      },
      sortable: "true",
    },

    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: "true",
    },
    {
      name: 'Images',
      selector: (row) => <img src={row.url + row.images[0]} alt="Service" className='ser_icon'
        onError={(e) => {
          e.target.onerror = null; // Remove the event handler to prevent infinite loop
        }} />,
      sortable: false,
    },
    {
      name: '',
      allowOverflow: false,
      cell: (row) => {
        return (
          <div className='d-flex justify-content-center  align-items-center  w-100 orderdiv'>
            <div >
              <Button variant='warning' className='fs_8 px-1 my_05 orderbtn' onClick={() => handleOpenModal(row.id)} >
                Detail
              </Button>
            </div>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      {isloading ? (
        <div className=' mt-3 d-flex justify-content-center align-items-center vh-75 w-100' >
          <Spinner animation="border" variant="dart" size="lg" />
        </div>
      ) : (
        <>

          {modalOpen === true ?
            <OrderModal showModal={modalOpen} onClose={handleCloseModal} id={orderId}
            /> : null}
          <PendingOrderTable columns={columns} data={orders} tname={"All Order"} /></>)}
    </div>
  )
}

export default AllOrders
