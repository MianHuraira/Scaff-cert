// ** React Imports
// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'
import Breadcrumbs from '../../../@core/components/breadcrumbs'
import { useState } from 'react'

const ParcelList = () => {
  const [isParcelList, setParcelList] = useState(true)

  return (
    <div className='app-user-list'>
      {/* <BreadcrumbsDefault /> */}
      <Breadcrumbs
        breadCrumbTitle='Parcel'
        breadCrumbParent='Parcel'
        breadCrumbActive='Parcel List'
      />
      <Row></Row>
      <Table isParcelList={isParcelList} />
    </div>
  )
}

export default ParcelList
