import React from "react";
import { Form, Button } from "react-bootstrap";
const UpdateUser = () => {
    return (<>
        <div className='border p-2 mt-2 shadow-sm w-100 h-50 rounded-1' >
            <Form>
                <Form.Group className="mb-1" controlId="firstname">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="lastname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="phonenumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="03xxxxxxxxx" />
                </Form.Group>
                <Form.Group className="mb-1" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" className='mt-2' role="button">
                    Save
                </Button>
            </Form>
        </div>
    </>);
}
export default UpdateUser;