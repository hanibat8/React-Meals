import React,{ useEffect, useState } from 'react';
import classes from './Input.module.css';

const Input=React.forwardRef((props,ref)=>{

    const [enteredValue,setEnteredValue]=useState('');
    const [touched,setTouched]=useState(false);
    const [error,setError]=useState(null);

    const inputChangeHandler=(e)=>{
        setTouched(true);
        setEnteredValue(e.target.value);
       //props.onValidation(e.target.value) ?setError(null): setError('Input field cannot be empty');
    }

    const inputBlurHandler=()=>{
        props.onValidation(enteredValue) ? setError(null):setError('Input field cannot be empty');
    }

    useEffect(()=>{
       // console.log(onValidation);
       if(props.onValidation){
        const identifier=setTimeout(()=>{
          if(touched) {
              props.onValidation(enteredValue) ?setError(null): setError('Input field cannot be empty');
              !error ? props.onValidatedValue(enteredValue):props.onValidatedValue(null);
            }
        },500);

        return()=>clearTimeout(identifier);
       }

    },[enteredValue,touched]);
    
 
    let inputClasses=error ? `${classes.input} ${classes.error}`:`${classes.input} `;

    return(
        <div className={classes.control}>
            <label className={classes.label} htmlFor={props.input.id}>{props.label}</label>
            <input onBlur={inputBlurHandler} onChange={inputChangeHandler} className={inputClasses} ref={ref} {...props.input}/>
            {error && <p className={classes.error}>{error}</p>}
        </div>
    );
});

export default Input;