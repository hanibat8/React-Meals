import { useEffect,useState } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem';

const AvailableMeals=()=>{
  const [meals,setMeals]=useState([]);
  let content;

  const transformData=(mealsDataObj)=>{
    //console.log(mealsDataObj);
    const entries = Object.values(mealsDataObj);
   
    const loadedMeals=entries.map((entry,index)=>{
    return{...entry,id:`m${index+1}`}});   

    //alternate way to create an array of obj
    /*for (const property in mealsDataObj) {
    loadedMeals1.push({id:property,
                      name: mealsDataObj[property].name,
                      description: mealsDataObj[property].description,
                      price:mealsDataObj[property].price},);
    }*/

    setMeals(loadedMeals);
    
  }

  const {sendRequest:fetchMeals,isLoading,error}=useHttp();
  
  useEffect(()=>{
    fetchMeals('https://meals-app-4fa25-default-rtdb.firebaseio.com/meals.json',transformData);
  },[fetchMeals])

  if(meals.length>0)
    content=meals.map((meal)=>(
      <MealItem name={meal.name}
                desc={meal.description}
                price={meal.price}
                id={meal.id}/>
  ));

  if(error)
    content=<p>Error occurred</p>;

  if(isLoading)
    content=<p>Meals Loading...</p>;

    return(
        <section className={classes.available__meals}>
            {content}
        </section>
    );
}

export default AvailableMeals;