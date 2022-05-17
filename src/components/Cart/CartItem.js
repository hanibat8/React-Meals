import classes from './CarItem.module.css';
import plus from '../../assets/SVG/plus.svg';
import minus from '../../assets/SVG/minus.svg';
import { useContext } from 'react/cjs/react.development';
import CartContext from '../../store/cart-context';

const CartItem=(props)=>{
    const ctx=useContext(CartContext);

    const addItemHandler=()=>{
        ctx.addItem({name:props.name,
                    qty:1,
                    price:props.price,
                    id:props.id});
    }

    const delItemHandler=()=>{
        ctx.removeItem(props.id);
    }
    
    return(
        <div className={classes.cart__item}>
            <div className={classes.cart__item__details}>
                <h3 className={classes.cart__item__name}>{props.name}</h3>
                <span className={classes.cart__item__price}>${props.price}</span>
                <span className={classes.cart__item__qty}>x{props.qty}</span>
            </div>
            <div className={classes.cart__item__btns}>
                <button className={classes.cart__item__btn} onClick={addItemHandler}>
                    <img className={classes['cart__item-btn__icon']} src={plus} alt='plus-icon'/>
                </button>
                <button className={classes.cart__item__btn} onClick={delItemHandler}>
                    <img className={classes['cart__item-btn__icon']} src={minus} alt='minus-icon'/>
                </button>
            </div>
        </div>
    );
}

export default CartItem;