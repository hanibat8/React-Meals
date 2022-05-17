import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Input from "../UI/Input";
import classes from './Cart.module.css';
import useHttp from '../../hooks/use-http';

const Checkout=()=>{
    const [validatedName,setValidatedName]=useState('');
    const [validatedStreet,setValidatedStreet]=useState('');
    const [validatedPostalCode,setValidatedPostalCode]=useState('');
    const [validatedCity,setValidatedCity]=useState('');
    const [isFormValid,setIsFormValid]=useState(false);
    
    const validationHandler=val=> val.trim()!=='';

    const validateName=(name)=>{
        setValidatedName(name);
    }

    const validateStreet=(street)=>{
        setValidatedStreet(street);
    }

    const validatePostalCode=(postalCode)=>{
        setValidatedPostalCode(postalCode);
    }

    const validateCity=(city)=>{
        setValidatedCity(city);
    }

    useEffect(()=>{
        if(validatedName && validatedCity && validatedPostalCode && validatedStreet){
            setIsFormValid(true);
        }
        else{
            setIsFormValid(false);
        }
    },[validateName,validatePostalCode,validateStreet,validatedCity])

    const submitHandler=(e)=>{
        e.preventDefault();

    }

    let disabled=isFormValid? false :true;
    
    return(
        <form onSubmit={submitHandler}>
            <Input onValidatedValue={validateName} onValidation={validationHandler} label='Name' input={{id:'name', type:'text'}}/>
            <Input onValidatedValue={validateStreet} onValidation={validationHandler}  label='Street' input={{id:'street', type:'text'}}/>
            <Input onValidatedValue={validatePostalCode} onValidation={validationHandler}  label='Postal Code' input={{id:'postal code', type:'text'}}/>
            <Input onValidatedValue={validateCity} onValidation={validationHandler}  label='City' input={{id:'city', type:'text'}}/>
            <div className={classes['cart--btns']}>
                {<button className={classes['cart--btn']}>Cancel</button>}
                {<button disabled={disabled} className={classes['cart--btn']}>Confirm</button>}
            </div>
        </form>
    );
}

export default Checkout;