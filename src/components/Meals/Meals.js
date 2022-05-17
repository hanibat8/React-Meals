import { Fragment } from 'react';
import MealsSummary from './MealsSummary';
import classes from './Meals.module.css';
import AvailableMeals from './AvailableMeals';

const Meals=()=>{
    return(
        <Fragment>
            <MealsSummary/>
            <AvailableMeals/>
        </Fragment>
    );
}

export default Meals;