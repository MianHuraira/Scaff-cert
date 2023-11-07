// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
// import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
// import NotificationDropdown from './NotificationDropdown'

// ** Third Party Components
// import { Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = (props) => {
  // ** Props
  // const { skin, setSkin } = props

  // // ** Function to toggle Theme (Light/Dark)
  // const ThemeToggler = () => {
  //   if (skin === 'dark') {
  //     return <Sun className='ficon' onClick={() => setSkin('light')} />
  //   } else {
  //     return <Moon className='ficon' onClick={() => setSkin('dark')} />
  //   }
  // }

  const noti_style = {
    background: 'red',
    width: '20px',
    height: '20px',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    right: '0',
    top: '0'
  };
  

  return (<>

    <ul className='nav navbar-nav align-items-center ms-auto'>
      <li>
        <div className='position-relative sm_none'>
          <img  style={{width:'30px' , height:'30px'}} src="./icons/bell.png" alt="" />
          <div style={noti_style}>
            <h5 style={{color:'white' , marginBottom:'0px'}}>5</h5>
          </div>

        </div>

      </li>
      {/* <IntlDropdown /> */}
      {/* <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem> */}
      {/* <NavbarSearch /> */}
      {/* <CartDropdown /> */}
      {/* <NotificationDropdown /> */}
      <UserDropdown />
    </ul></>
  )
}
export default NavbarUser
