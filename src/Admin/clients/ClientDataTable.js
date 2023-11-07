// ** React Imports
import { Fragment, useState } from 'react'

// ** Table Columns
// import { data, multiLingColumns } from '../../views/tables/data-tables/data'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useHistory, useNavigation } from 'react-router-dom'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardFooter, CardText, Input, Label, Row, Col } from 'reactstrap'

const ClientDataTable = ({data, columns}) => {
    // ** State
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const history = useHistory()

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
                    item.ClientName.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.Siret.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.email.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.PhoneNumber.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.Address.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.Locality.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.Country.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.Region.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.ZipCode.toLowerCase().startsWith(value.toLowerCase())
                const includes =
                    item.ClientName.toLowerCase().includes(value.toLowerCase()) ||
                    item.Siret.toLowerCase().includes(value.toLowerCase()) ||
                    item.email.toLowerCase().includes(value.toLowerCase()) ||
                    item.PhoneNumber.toLowerCase().includes(value.toLowerCase()) ||
                    item.Address.toLowerCase().includes(value.toLowerCase()) ||
                    item.Locality.toLowerCase().includes(value.toLowerCase()) ||
                    item.Country.toLowerCase().includes(value.toLowerCase()) ||
                    item.Region.toLowerCase().includes(value.toLowerCase()) ||
                    item.ZipCode.toLowerCase().includes(value.toLowerCase())
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
                <CardTitle tag='h4'>Client</CardTitle>
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
                    onRowClicked={() => history.push('client-edit')}
                    noHeader
                    responsive
                    pagination
                    selectableRowsNoSelectAll
                    columns={columns}
                    className='react-dataTable'
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

export default ClientDataTable
