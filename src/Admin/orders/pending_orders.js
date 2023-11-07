/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '@styles/react/apps/app-users.scss'
import React, { useEffect, useState } from 'react'
import PendingOrderTable from './orderDataTable';
import { Button, Spinner } from 'react-bootstrap';
import './order.css';
import { apiRequest } from '../../api/apirequest';
import OrderModal from './orderModal';

const PendingOrders = () => {
  const [orders, setorders] = useState('');
  const [isloading, setisLoading] = useState(false);
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
  const getdata = () => {
    setisLoading(true)
    const body = new FormData();
    body.append("type", "get_data");
    body.append("table_name", "orders");
    apiRequest({ body })
      .then(async (res) => {
        const filteredOrders = res.data.filter((order) => order.status === "pending");
        setorders(filteredOrders);
        setisLoading(false);

      })
      .catch((error) => {
        setisLoading(false);
        console.error(error);
      });
  };
  const getupdateDate = () => {
    const body = new FormData();
    body.append("type", "get_data");
    body.append("table_name", "orders");
    apiRequest({ body })
      .then(async (res) => {
        const filteredOrders = res.data.filter((order) => order.status === "pending");
        setorders(filteredOrders);
      })
      .catch((error) => {
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
          getupdateDate()
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }
  useEffect(() => {
    getdata();
  }, [])

  const [acceptedIds, setAcceptedIds] = useState([]);
  const [rejectedIds, setRejectedIds] = useState([]);

  const handleAccept = (id, statusOrder) => {
    setAcceptedIds([...acceptedIds, id]);
    setRejectedIds(rejectedIds.filter((rejectedId) => rejectedId !== id));
    updateOrderStatus(id, statusOrder);
  };

  const handleReject = (id, statusOrder) => {
    setRejectedIds([...rejectedIds, id]);
    setAcceptedIds(acceptedIds.filter((acceptedId) => acceptedId !== id));
    updateOrderStatus(id, statusOrder);
  };

  const isAccepted = (id) => acceptedIds.includes(id);
  const isRejected = (id) => rejectedIds.includes(id);

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
            <div key={row.id}>
              <div className='d-flex justify-content-between align-items-center flex-column' >
                <div>
                  {!isAccepted(row.id) && (
                    <Button
                      variant="success"
                      onClick={() =>
                        handleAccept(row.id, "accept")
                      }
                      disabled={isRejected(row.id)}
                      className='fs_8 px-1 my_05 orderbtn'
                    >
                      {isRejected(row.id) ? 'Rejected' : 'Accept'}
                    </Button>
                  )}
                </div>
                <div>
                  {!isRejected(row.id) && (
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleReject(row.id, "cancelled")
                      }
                      disabled={isAccepted(row.id)}
                      className='fs_8 px-1 my_05 orderbtn'
                    >
                      {isAccepted(row.id) ? 'Accepted' : 'Reject'}
                    </Button>
                  )}
                </div>

              </div>
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

          < PendingOrderTable columns={columns} data={orders} tname={"Pending Orders"} /></>
      )}
    </div>
  )
}

export default PendingOrders
