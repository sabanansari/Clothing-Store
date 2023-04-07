import {ShoppingIcon,CartIconContainer,ItemCount} from './cart-icon.styles.jsx';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen,selectCartCount } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.reducer.js';

const CartIcon = () => {

    // const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext);
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);

    const cartCount = useSelector(selectCartCount);

    const toggleCartOpen = ()=>dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
