import React from 'react'
import { Home, ChevronDown, Plus } from 'react-feather'
import {
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input
} from 'reactstrap'

const CustomHeader = (props) => {
  return (
    <div className='data-list-header d-flex justify-content-between flex-wrap'>
      <div className='actions-left d-flex flex-wrap'>
        {/* <UncontrolledDropdown className='data-list-dropdown mr-1'>
          <DropdownToggle className='p-1' color='primary'>
            <span className='align-middle mr-1'>Actions</span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag='div' right>
            <DropdownItem tag='a'>Delete</DropdownItem>
            <DropdownItem tag='a'>Archive</DropdownItem>
            <DropdownItem tag='a'>Print</DropdownItem>
            <DropdownItem tag='a'>Export</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        <Button
          className='add-new-btn'
          color='primary'
          onClick={() => props.handleSidebar(true, true)}
          outline
        >
          <Home size={15} />
          <span className='align-middle'>Add New </span>
        </Button>
      </div>
      <div className='actions-right d-flex flex-wrap mt-sm-0 mt-2'>
        <UncontrolledDropdown className='data-list-rows-dropdown mr-1 d-md-block d-none'>
          <DropdownToggle color='' className='sort-dropdown'>
            <span className='align-middle mx-50'>
              {/* {`${props.index[0]} - ${props.index[1]} of ${props.total}`} */}
            </span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag='div' end>
            <DropdownItem tag='a' onClick={() => props.handleRowsPerPage(4)}>
              4
            </DropdownItem>
            <DropdownItem tag='a' onClick={() => props.handleRowsPerPage(10)}>
              10
            </DropdownItem>
            <DropdownItem tag='a' onClick={() => props.handleRowsPerPage(15)}>
              15
            </DropdownItem>
            <DropdownItem tag='a' onClick={() => props.handleRowsPerPage(20)}>
              20
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className='filter-section'>
          <Input type='text' onChange={(e) => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  )
}
const ListViewConfig = () => {
  return (
    <div className='data-list-header d-flex justify-content-between flex-wrap'>
      <div className='actions-left d-flex flex-wrap'>
        <Button
          className='add-new-btn'
          color='primary'
          // onClick={() => props.handleSidebar(true, true)}
          outline
        >
          <Plus size={15} />
          <span className='align-middle'>Add New </span>
        </Button>
      </div>
    </div>
  )
}

export default ListViewConfig
