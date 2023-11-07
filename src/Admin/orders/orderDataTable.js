// ** React Imports
import React, { Fragment, useState } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col } from 'reactstrap'
import './order.css';


const PendingOrderTable = ({ data, columns, tname }) => {
    // ** State    
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])

    // ** Hooks
    const { t } = useTranslation()

    // ** Function to handle pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // ** Function to handle filter
    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)
        if (value.length) {
            updatedData = data.filter(item => {
                const startsWith =
                    item.first_name.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.billing_email.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.billing_phone.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.street.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.city.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.cleaning_request.toLowerCase().startsWith(value.toLowerCase())
                    item.status.toLowerCase().startsWith(value.toLowerCase())
                const includes =
                    item.first_name.toLowerCase().includes(value.toLowerCase()) ||
                    item.billing_email.toLowerCase().includes(value.toLowerCase()) ||
                    item.billing_phone.toLowerCase().includes(value.toLowerCase()) ||
                    item.street.toLowerCase().includes(value.toLowerCase()) ||
                    item.city.toLowerCase().includes(value.toLowerCase()) ||
                    item.cleaning_request.toLowerCase().includes(value.toLowerCase())
                    item.status.toLowerCase().includes(value.toLowerCase())
                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
            setSearchValue(value)
        }
    }

    // ** Pagination Previous Component
    const Previous = () => {
        return (
            <Fragment>
                <span className='align-middle d-none d-md-inline-block'>{t('Prev')}</span>
            </Fragment>
        )
    }

    // ** Pagination Next Component
    const Next = () => {
        return (
            <Fragment>
                <span className='align-middle d-none d-md-inline-block'>{t('Next')}</span>
            </Fragment>
        )
    }
   

    // ** Custom Pagination Component
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel={<Previous size={15} />}
            nextLabel={<Next size={15} />}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
            breakLabel={'...'}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName={'active rounded-circle'}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next ms-auto pe-1'}
            previousClassName={'page-item prev me-auto ps-2'}
            previousLinkClassName={'page-link '}
            pageLinkClassName={'page-link rounded-circle'}
            breakClassName='page-item rounded-circle'
            breakLinkClassName='page-link rounded-circle'
            containerClassName={'pagination react-paginate pagination-sm d-flex paginat justify-content-center pe-1 mt-1'}
        />
    )
    return (
        <Card>
            <CardHeader className='border-bottom'>
                <CardTitle tag='h4'>{tname}</CardTitle>
            </CardHeader>
            <Row className='justify-content-end mx-0'>
                <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
                    <Label className='me-1' for='search-input-1'>
                        {t('Search')}
                    </Label>
                    <Input
                        className='dataTable-filter mb-50 w-100'
                        type='text'
                        bsSize='sm'
                        id='search-input-1'
                        value={searchValue}
                        onChange={handleFilter}
                    />
                </Col>
            </Row>
            <div className='react-dataTable mb-2'>
                <DataTable
                    noHeader
                    responsive
                    pagination
                    selectableRowsNoSelectAll
                    columns={ columns}
                    className='react-dataTable orderdiv'
                    paginationPerPage={7}
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : data}
                />
            </div>
        </Card>
    )
}

export default PendingOrderTable
