
import {Outlet, Link } from 'react-router-dom'
import{Fragment, useContext} from 'react'

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.style.scss'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'

import { UserContext } from '../../context/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import { CartContext } from '../../context/cart.context'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    // const signOutHandler = async () => {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }

  return (
    <>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo'/>
            </Link>

            
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                {currentUser ? 
                    // (<span className='nav-link' onClick={signOutHandler}> SIGN OUT</span>)
                    (<span className='nav-link' onClick={signOutUser}> SIGN OUT</span>)
                    :
                    (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
                }

                <CartIcon />            
            </div>

            { isCartOpen &&  <CartDropDown /> }
           
        </div>
        <Outlet />
    </>
  )
}

export default Navigation
