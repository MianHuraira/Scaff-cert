/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Tab, Tabs } from 'react-bootstrap';
import img1 from '../assests/profile.svg';
import './client.css';
import ClientDetail from './Clientdetail';
import ClientPlace from './place';
// import UserPremissions from './Clientpremission';


const ClientInfo = () => {
    return (
        <>
            <Container fluid>
                <div className='user_width pe-2 h-100' >
                    <Link to="client-detail" className='fs-5' >
                        <span className='me-1' >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="">
                            <rect opacity="0.5" x="6" y="11" width="13" height="2" rx="1" fill="currentColor" />
                            <path d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z" fill="currentColor" />
                        </svg>
                        </span>
                        <span className='text-secondary' >
                            Back to User
                        </span>
                    </Link>

                    <div className='mt-2 d-flex align-items-center justify-content-between' >
                        <div className='d-flex align-items-center' >
                            <img className='rounded-circle me-2' width='60px' src={img1} />
                            <div>
                                <h4 className='text-black' style={{ fontWeight: "700" }} >user78213@omyki.com</h4>
                                <h6 className='text-secondary' > user_id: <span className='rounded-1' style={{ backgroundColor: "#E5E5E5", fontSize: "10px", padding: "1px 4px" }} >auth0|a56a6a6a65sfsd56df</span> </h6>
                            </div>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown">
                                Action
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {/* <UserNavbar /> */}
                    <div className='mt-3 ' >
                        <Tabs
                            id="user-tabs"
                            defaultActiveKey="detail"
                            className="m-0 p-0 border-bottom "
                        >
                            <Tab eventKey="detail" title="Detail">
                                <ClientDetail/>
                            </Tab>
                            <Tab eventKey="place" title="Place" >
                                <ClientPlace />
                            </Tab>
                            <Tab eventKey="settings" title="Settings" >
                                <div className='mt-2' >None</div>
                            </Tab>

                        </Tabs>
                    </div>


                </div>
            </Container>
        </>
    );
};

export default ClientInfo