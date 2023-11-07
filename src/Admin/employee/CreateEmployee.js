/* eslint-disable */
import React, { useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Button, Form, Input, Label, Spinner } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './employee.css'

const CreateEmployee = () => {
    const [phone, setPhone] = useState()
    const [loading, setLoading] = useState(false)
    const data = {
      eName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      speciality: '',
      experience: '',
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true)
      data.eName = e.target.elements.name.value,
      data.email = e.target.elements.email.value,
      data.password = e.target.elements.password.value,
      data.phone = phone,
      data.address = e.target.elements.address.value,
      data.speciality = e.target.elements.speciality.value,
      data.experience = e.target.elements.experience.value
      setLoading(false)
      console.log(data)
      e.target.reset()
    }

    return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item href="/employee/create-employee" >Employee</Breadcrumb.Item>
      <Breadcrumb.Item active>Create Employee</Breadcrumb.Item>
    </Breadcrumb>
    <Form onSubmit={handleSubmit}>
        <Label className='mt-3 label_font'>Name</Label>
        <Input type='text' name='name' required placeholder='Enter your name'/>
        <Label className='mt-2 label_font'>Email</Label>
        <Input type='email' name='email' placeholder='johndoe@gmail.com' required/>
        <Label className='mt-2 label_font'>Password</Label>
        <InputPasswordToggle className='input-group-merge' name='password' />
        <Label className='mt-2 label_font'>Phone</Label>
        <PhoneInput
                     containerClass='custom-input'
                     inputClass='custom-input'
                     name='phone'
                     value={phone}
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
                       name: 'phone',
                       required: true
                     }}
                     onChange={(e) => setPhone(e)}
                  />
        <Label className='mt-2 label_font'>Address</Label>
        <Input type='text' name='address' required placeholder='Enter address'/>
        <Label className='mt-2 label_font'>Speciality</Label>
        <Input type='text' name='speciality' required placeholder='Enter speciality'/>
        <Label className='mt-2 label_font'>Experience</Label>
        <Input type='text' name='experience' required placeholder='2 years'/>
        <Button disabled={loading ? true : false} type='submit' className='my-2' color='primary'>
            {
              loading ?
              <Spinner color='white' size='sm'/>
              :
              'Submit'
            }
        </Button>
    </Form>
    </>
  )
}

export default CreateEmployee
