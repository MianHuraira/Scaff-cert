// ** React Imports
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../../../Admin/assests/logo_main.svg'
// ** Icons Imports
import { Disc, X, Circle } from 'react-feather'

// ** Config
import themeConfig from '@configs/themeConfig'

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])



  return (
    <div className='navbar-header position-relative'>
   
      <ul className='nav navbar-nav flex-row mt-1'>
        <li className='nav-item'>
          <NavLink to='/dashboard' className='navbar-brand'>
            
            <span className='brand-logo'>
              <img src={logo} alt='logo' style={{maxWidth:"135px"}} />
            </span>
          </NavLink>
        </li>
       
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
