/* eslint-disable no-unused-vars */
import '@styles/react/apps/app-users.scss'
import PendingOrderTable from './orderDataTable';
import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import './order.css';
import { apiRequest } from '../../api/apirequest';
import OrderModal from './orderModal';

const CancelOrders = () => {
  const [orders, setorders] = useState('');

  const [acceptedIds, setAcceptedIds] = useState([]);
  const [cancelled, setcancelled] = useState([]);
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
  const handleComplete = (id, status) => {
    if (cancelled.includes(id)) {
      setcancelled(cancelled.filter((completedId) => completedId !== id));
      console.log("Data 1");
    } else {
      console.log("Data 2");
      updateOrderStatus(id, status)
      setcancelled([...cancelled, id]);
    }
  };
  const [isloading, setisLoading] = useState(false);

  const isAccepted = (id) => acceptedIds.includes(id);
  const getdata = () => {
    setisLoading(true);
    const body = new FormData();
    body.append("type", "get_data");
    body.append("table_name", "orders");
    apiRequest({ body })
      .then(async (res) => {
        console.log(res);
        const filteredOrders = res.data.filter((order) => order.status === "cancelled");
        setisLoading(false);
        setorders(filteredOrders);
      })
      .catch((error) => {
        setisLoading(false);
        console.error(error);
      });
  };

  const updateOrderStatus = (id, status) => {
    const body = new FormData();
    body.append("type", "update_data");
    body.append("table_name", "orders");
    body.append("id", id);
    body.append("status", status);
    console.log(status);
    apiRequest({ body })
      .then(async (res) => {
        console.log(res);
        if (res.result === true) {
          getdata()
        }
      }
      )
      .catch((error) => {
        console.error(error);
      });

  }
  useEffect(() => {
    getdata();
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
      selector: (row) => <img src={row.url + row.images[0]} alt="Service" className='ser_icon' />,
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
   
      <PendingOrderTable columns={columns} data={orders} tname={"Cancel Order"} /></> )  }
    </div>
  )
}

export default CancelOrders
