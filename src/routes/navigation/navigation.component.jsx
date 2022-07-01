
import {Outlet, Link } from 'react-router-dom'
import{Fragment, useContext} from 'react'

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
// import './navigation.style.scss'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'

import { UserContext } from '../../context/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import { CartContext } from '../../context/cart.context'

import { NavigationContainer, NavLink, NavLinks, LogoContainer} from './navigation.style'
import { Nav } from 'react-bootstrap'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    // const signOutHandler = async () => {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }

  return (
    <>
        {/* <div className='navigation'>
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
           
        </div> */}


         <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo'/>
            </LogoContainer>

            
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {currentUser ? 
                    // (<span className='nav-link' onClick={signOutHandler}> SIGN OUT</span>)
                    (<NavLink as='span' onClick={signOutUser}> SIGN OUT</NavLink>)
                    :
                    (<NavLink to='/auth'>SIGN IN</NavLink>)
                }

                <CartIcon />            
            </NavLinks>

            { isCartOpen &&  <CartDropDown /> }
           
        </NavigationContainer>
        <Outlet />
    </>
  )
}

export default Navigation
