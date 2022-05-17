import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer=(state, action) => {
    
    if(action.type==='ADD'){
        const existingIndex=state.items.findIndex((item)=>item.name==action.item.name);
        let updatedItems;

        if(existingIndex>=0){
            updatedItems=[...state.items];
            
            let updatedItem={...state.items[existingIndex]};
            updatedItem.qty++;
            updatedItem.price+=action.item.price;
            updatedItem.price= +(updatedItem.price).toFixed(2);
            
            updatedItems[existingIndex]=updatedItem;
        }
        
        else{
          updatedItems=state.items.concat(action.item);
        }

        console.log(state.totalAmount);
        console.log(action.item.price);
        const totalAmount=+(state.totalAmount+action.item.price).toFixed(2);

        return{
          items:updatedItems,
          totalAmount:totalAmount
        }
    }

    else if(action.type==='REMOVE'){
      const existingIndex=state.items.findIndex((item)=>item.id==action.id);
      let updatedItems;
      let updatedItem;
      let priceOfOneItem
      
      if(existingIndex>=0){
        updatedItem={...state.items[existingIndex]};
        priceOfOneItem=updatedItem.price/updatedItem.qty;
        
        if(updatedItem.qty>1){
          updatedItems=[...state.items];
          updatedItem.qty--;
          updatedItem.price=+updatedItem.price-priceOfOneItem;
          updatedItem.price=+(updatedItem.price.toFixed(2));
          updatedItems[existingIndex]=updatedItem;
        }

        else{
          updatedItems=[...state.items];
          updatedItems=updatedItems.filter((item)=>{return item.id!==updatedItem.id});
        }

        console.log(priceOfOneItem);
        const totalAmount=+(state.totalAmount-priceOfOneItem).toFixed(2);

        return{
          items:updatedItems,
          totalAmount:totalAmount
        }
      }
    }
    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
      cartReducer,
      defaultCartState
    );
  
    const addItemToCartHandler = (item) => {
      dispatchCartAction({ type: 'ADD', item: item });
    };
  
    const removeItemFromCartHandler = (id) => {
      dispatchCartAction({ type: 'REMOVE', id: id });
    };
  
    //console.log(cartState);
    const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
    };
  
    return (
      <CartContext.Provider value={cartContext}>
        {props.children}
      </CartContext.Provider>
    );
  };
  
  export default CartProvider;