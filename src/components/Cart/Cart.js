import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart=(props)=>{
    
    const [orderBtnIsClicked,setOrderBtnIsClicked]= useState(false);
    const ctx=useContext(CartContext);
    
    const meals=ctx.items.map((meal)=>{
        return <CartItem name={meal.name}
        qty={meal.qty}
        price={meal.price/meal.qty}
        id={meal.id}
        />
    });

    const orderBtnClickHandler=()=>{
        meals.length>0 && setOrderBtnIsClicked(true);
    }
    
    return(
        <Modal onClose={props.onClose}>
            {meals}
            <div className={classes['cart--total-amount']}>
                <p>Total Amount</p>
                <p>${ctx.totalAmount}</p>
            </div>
            <div className={classes['cart--btns']}>
                {!orderBtnIsClicked && <button className={classes['cart--btn']}>Close</button>}
                {!orderBtnIsClicked && <button onClick={orderBtnClickHandler} className={`${classes['cart--btn']} ${classes['cart--btn--order']}`}>Order</button>}
            </div>
            {orderBtnIsClicked && meals.length>0 &&
               <Checkout/>
            }
        </Modal>
    );
}

export default Cart;