import React, { useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Button, Form, Input, Label, Spinner } from 'reactstrap'

const CreateSeervice = () => {
  const data = {
    sName: '',
    desc: '',
    duration: '',
    fee: ''
  }
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    data.sName = e.target.elements.sName.value
    data.desc = e.target.elements.desc.value
    data.fee = e.target.elements.fee.value
    data.duration = e.target.elements.duration.value
    console.log(data)
    setLoading(false)
    e.target.reset()
  }


  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item href="/services/create-service" >Services</Breadcrumb.Item>
      <Breadcrumb.Item active>Create Service</Breadcrumb.Item>
    </Breadcrumb>
    <Form onSubmit={handleSubmit}>
        <Label className='mt-3 label_font'>Service Name</Label>
        <Input type='text' name='sName' required placeholder='Enter service name'/>
        <Label className='mt-2 label_font'>Description</Label>
        <Input type='textarea' name='desc' placeholder='Description'/>
        <Label className='mt-2 label_font'>Fee</Label>
        <Input type='number' name='fee' required placeholder='33'/>
        <Label className='mt-2 label_font'>Duration</Label>
        <Input type='time' name='duration' required placeholder='Enter duration'/>
        <Button disabled={loading ? true : false} type='submit' className='mt-2 mb-5' color='primary'>
            {
              loading ?
              <Spinner color='white' size='sm'/>
              :
              "Submit"
            }
            
        </Button>
    </Form>
    </>
  )
}

export default CreateSeervice
