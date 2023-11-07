// ** React Imports
// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'
import Breadcrumbs from '../../../@core/components/breadcrumbs'
import { useState } from 'react'

const RiderList = () => {
  const [isRiderList, setRiderList] = useState(true)

  return (
    <div className='app-user-list'>
      {/* <BreadcrumbsDefault /> */}
      <Breadcrumbs
        breadCrumbTitle='Rider'
        breadCrumbParent='Rider'
        breadCrumbActive='Rider List'
      />
      <Row></Row>
      <Table isRiderList={isRiderList} />
    </div>
  )
}

export default RiderList
