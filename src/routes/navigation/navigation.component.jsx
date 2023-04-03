import { Fragment,useContext } from "react";
import { Outlet } from "react-router-dom";
import {ReactComponent as StoreLogo} from '../../assests/store.svg';
// import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import { CartContext } from "../../contexts/cart.context";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import {LogoContainer, NavigationContainer, NavLinks, NavLink} from './navigation.styles.jsx';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () =>{

    const currentUser = useSelector(selectCurrentUser);
    // const {currentUser} = useContext(UserContext);
    // const {isCartOpen} = useContext(CartContext);

    const isCartOpen = useSelector(selectIsCartOpen);

    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
            <StoreLogo className="logo" />
            </LogoContainer>
          
          <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
                currentUser ? (
                    <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                ) : (<NavLink to='/auth'>SIGN IN</NavLink>)
                } 
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation;