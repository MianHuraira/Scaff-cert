import React, { useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Button, Form, Input, Label, Spinner } from 'reactstrap'
import Select from 'react-select'

const SetAvailability = () => {
    const [days, setDays] = useState([])
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState()
    
    const data = {
      task: '',
      day: ''
    }
    const options = [
      { value: 'task 1', label: 'Task 1'},
      { value: 'task 2', label: 'Task 2'},
      { value: 'task 3', label: 'Task 3'},
    ]

    const handleSubmit = (e) => {
      setLoading(true)
      e.preventDefault();
      data.task = value.value;
      data.day = JSON.stringify(days)
      console.log(data)
      setLoading(false)
      setDays([])
      setValue()
      e.target.reset()
    }

  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item href="/availability/set-availability" >Availability</Breadcrumb.Item>
      <Breadcrumb.Item active>set Availability</Breadcrumb.Item>
    </Breadcrumb>
    <Form onSubmit={handleSubmit}>
        <Label className='mt-3 label_font'>Tasks</Label>
        <Select value={value} onChange={(e) => setValue({value: e.value, label: e.label})} options={options} name='task'/>
        <Label className='mt-2 label_font'>Day</Label>
            <div className=''>
            <Input type='checkbox' onChange={(e) => setDays(prev => [...prev, e.target.value])} value='monday'/>
            <Label className='ms-1 value_font'>Monday</Label>
            </div>
            <div className='mt-1'>
            <Input type='checkbox' onChange={(e) => setDays(prev => [...prev, e.target.value])} value='tuesday'/>
            <Label className='ms-1 value_font'>Tuesday</Label>
            </div>
            <div className='mt-1'>
            <Input type='checkbox' onChange={(e) => setDays(prev => [...prev, e.target.value])} value='wednesday'/>
            <Label className='ms-1 value_font'>Wednesday</Label>
            </div>
            <div className='mt-1'>
            <Input type='checkbox' onChange={(e) => setDays(prev => [...prev, e.target.value])} value='thursday'/>
            <Label className='ms-1 value_font'>Thursday</Label>
            </div>
            <div className='mt-1'>
            <Input type='checkbox' onChange={(e) => setDays(prev => [...prev, e.target.value])} value='friday'/>
            <Label className='ms-1 value_font'>Friday</Label>
            </div>
            {/* <div className='mt-1'>
            <Input type='checkbox' onChange={(e) => setDays(prev => [...prev, e.target.value])} value='saturday'/>
            <Label className='ms-1'>Saturday</Label>
            </div>
            <div className='mt-1'>
            <Input type='checkbox' onChange={(e) => setDays(prev => [...prev, e.target.value])} value='sunday'/>
            <Label className='ms-1'>Sunday</Label>
            </div> */}
            <Button type='submit' disabled={loading ? true : false} color='primary' className='my-2'>
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

export default SetAvailability
