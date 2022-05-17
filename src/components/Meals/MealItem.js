import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem=(props)=>{
    return (
        <div className={classes.meal__item}>
            <div className={classes.meal__item__details}>
                <h3 className={classes.meal__item__name}>{props.name}</h3>
                <p className={classes.meal__item__desc}>{props.desc}</p>
                <p className={classes.meal__item__price}>${props.price}</p>
            </div>
            <MealItemForm props={props}/>
        </div>
    );
}

export default MealItem;