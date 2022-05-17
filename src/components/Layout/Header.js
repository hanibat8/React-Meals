import { Fragment } from 'react/cjs/react.production.min';
import classes from './Header.module.css';
import shoppingCart from '../../assets/SVG/shoppingCart.svg';
import mealImg from '../../assets/meals.jpg';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';
import { useEffect, useState } from 'react';

const Header=(props)=>{
    const [btnIsHighlighted,setBtnIsHighlighted]=useState(false);
    const ctx=useContext(CartContext);

    const {items}=ctx;

    const btnClasses = `${classes.headerBtn} ${btnIsHighlighted?classes.bump:''}`;

    const noOfItems=ctx.items.reduce((curNumber, item)=>{
        return curNumber+(+item.qty);
    },0)

    useEffect(()=>{
        if(items.length<0){
            return;
        }
        setBtnIsHighlighted(true);

        const timer=setTimeout(()=>{
            setBtnIsHighlighted(false);
        }
        ,300);

        return ()=>{
            clearTimeout(timer);
        }
        
    },[items])

    return(
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <button className={btnClasses} onClick={props.onShowCartHandler}>
                    <span><img className={classes['header-btn__icon']} src={shoppingCart} alt='shopping-cart-icon'/>Your Cart</span>
                    <span className={classes['header-badge']}>{noOfItems}</span>
                </button>
            </header>
            <div className={classes.meals__img__container}>
                <img className={classes.meals__img} src={mealImg}/>
            </div>
        </Fragment>     
    );
}

export default Header;