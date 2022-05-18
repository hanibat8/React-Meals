import Input from '../UI/Input';
import { useRef } from 'react';
import classes from './MealItemForm.module.css';
import plus from '../../assets/SVG/plus.svg';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

const MealItemForm=(props)=>{
    const ctx=useContext(CartContext);

    //console.log(props);
    const amountInputRef=useRef();

    const addItemHandler=(qty)=>{
        ctx.addItem({name:props.props.name,
                    qty:qty,
                    price:props.props.price,
                    id:props.props.id});
        //console.log(ctx.items);
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        //console.log(amountInputRef.current.value);
        addItemHandler(amountInputRef.current.value);
    }

    return(
        <form onSubmit={submitHandler} className={classes.form}>
            <Input label='Amount'
            ref={amountInputRef}
            input={{
                id: 'amount_' + props.props.id,
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }}/>
            <button><img src={plus}/><span>Add</span></button>            
        </form>
    );
}

export default MealItemForm;