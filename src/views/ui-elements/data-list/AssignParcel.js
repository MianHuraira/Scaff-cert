// ** React Imports
// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'
import Breadcrumbs from '../../../@core/components/breadcrumbs'
import { useState } from 'react'

const AssignParcel = () => {
  const [isAssignParcelList, setAssignParcelList] = useState(true)

  return (
    <div className='app-user-list'>
      {/* <BreadcrumbsDefault /> */}
      <Breadcrumbs
        breadCrumbTitle='Assign Parcel'
        breadCrumbParent='Assign Parcel'
        breadCrumbActive='Assign Parcel List'
      />
      <Row></Row>
      <Table isAssignParcelList={isAssignParcelList} />
    </div>
  )
}

export default AssignParcel
