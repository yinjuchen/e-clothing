import { Outlet, Link } from "react-router-dom"
import { Fragment, useContext } from "react"
import './navigation.styles.scss'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { UserContext } from "../../context/user.context"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../context/cart.context"

const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
          Shop
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>Sign Out</span>
            ) : (
            <Link className="nav-link" to='/auth'>
              Sign In
            </Link>
          )}
          <CartIcon/>
        </div> 
        {
          isCartOpen && <CartDropDown/>

        }
      </div>
     <Outlet/>  
    </Fragment>
  )
}

export default Navigation