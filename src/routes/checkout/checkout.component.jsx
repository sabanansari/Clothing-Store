import './checkout.styles.scss';
import { useContext } from 'react'; 
// import { CartContext } from '../../contexts/cart.context';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';
import PaymentForm from '../../components/payment-form/payment-form.component';

const CheckOut = ()=>{

    // const {cartItems,addItemToCart,removeItemFromCart,cartTotal} = useContext(CartContext);

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return(
        <div className='checkout-container'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
            <span>Description</span>
            </div>
            <div className='header-block'>
            <span>Quantity</span>
            </div>
            <div className='header-block'>
            <span>Price</span>
            </div>
            <div className='header-block'>
            <span>Remove</span>
            </div>
        </div>
                {cartItems.map((cartItem)=>{
                    const {id,name,quantity} = cartItem;
                    return(
                        <CheckOutItem  key={cartItem.id} cartItem={cartItem}/>
                    )
                })}
                <span className='total'>{cartTotal}$</span>
            <PaymentForm/>
        </div>
        
    )
}

export default CheckOut;