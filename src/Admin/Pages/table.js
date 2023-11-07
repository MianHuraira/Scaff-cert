// ** React Imports
import { Fragment, useState } from 'react'
import './table.css';

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useHistory, useNavigation } from 'react-router-dom';
import leftArrow from "../../Admin/assests/icons/left-arrow.png";
import rightArrow from "../../Admin/assests/icons/right-arrow.png";


const ClientDataTable = ({data, columns, title}) => {
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



    // ** Pagination Previous Component
    const Previous = () => {
        return (
            <Fragment>
            <span className='align-middle d-md-inline-block'>
                {t('')}
                <img style={{width:'20px' , height:'20px'}} src={leftArrow} alt="Left Arrow" />
            </span>
        </Fragment>
        )
    }
    

    // ** Pagination Next Component
    const Next = () => {
        return (
            <Fragment>
            <span className='align-middle  d-md-inline-block'>
                {t('')}
                <img style={{width:'20px' , height:'20px'}} src={rightArrow} alt="right Arrow" />
            </span>
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
            pageCount={searchValue?.length ? Math.ceil(filteredData?.length / 7) : Math.ceil(data?.length / 7) || 1}
            breakLabel={'...'}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName={'active rounded-circle'}
            pageClassName={'page-item me-1'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item ms-2 next'}
            previousClassName={'page-item me-2 prev'}
            previousLinkClassName={'page-link '}
            pageLinkClassName={'page-link rounded-circle coun_nbr'}
            breakClassName='page-item rounded-circle'
            breakLinkClassName='page-link rounded-circle'
            containerClassName={'pagination  react-paginate pagination-sm d-flex align-items-center paginat justify-content-end  mt-1'}
        />
    )

    return (
        <>
            <div className='react-dataTable mb-2'>
                <DataTable
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
                    data={searchValue?.length ? filteredData : data}
                />
            </div>
        </>
    )
}

export default ClientDataTable
