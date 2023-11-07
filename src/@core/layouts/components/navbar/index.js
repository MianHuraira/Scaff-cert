// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import { transparentBg } from '@src/assets/images/svg/transparent.svg';

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  const myInlineStyles = {
    backgroundColor: 'transparent',
    outline: 'none',
    color: 'white',

  };

  return (
    <Fragment>

      <div className='bookmark-wrapper d-flex align-items-center flex-row-reverse'>
        <div className='d-flex align-items-center ms-1'>
          <img className='search_icon' src="./icons/search.png" alt="" />
          <input className='border-0 ms-1 w-100' style={myInlineStyles} type="search" placeholder='Search(Ctrl +/)' />

        </div>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
