import { useReducer } from "react";

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEMS = "REMOVE_ITEMS";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_CART = "CLEAR_CART";


const initialState = {
    items: [], // {id, name, price, quantity}
    totalAmount: 0,
    totalItems: 0,
};

const reducer = (state , actions ) => {

    // return new state 
    console.log("Action Dispactched" , actions); 
    switch(actions.type){
        case  ADD_ITEM: {
            const existingItemIndex = state.items.findIndex(
                item => item.id === actions.payload.id
            )
            let updatedItems; 
            if(existingItemIndex >= 0){
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity : updatedItems[existingItemIndex].quantity + 1,
                };
            }
            else{
                updatedItems = [
                    ...state.items,
                    {
                        ...actions.payload,
                        quantity:1,
                    },
                ];
            }
            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedItems.reduce(
                    (total,item) => total + item.price * item.quantity,
                    0
                ),
                totalItems: updatedItems.reduce((total , item) => total +item.quantity,
                0),
            };
        }
        case REMOVE_ITEMS : {
            const filteredItems = state.items.filter(
                (item) => item.id !== actions.payload.id
            );

            return {
                ...state,
                items: filteredItems,
                totalAmount: filteredItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                ),
                totalItems: filteredItems.reduce(
                    (total , item) => total + item.quantity,
                    0
                ),
            };
        }
        case UPDATE_QUANTITY: {
            if(actions.payload.quantity === 0){
                return reducer(state, {
                    type: "REMOVE_ITEMS",
                    payload: {id: actions.payload.id}
                });
            }
            const updateQuantityItems = state.items.map((item) =>
                item.id === actions.payload.id ? {...item, quantity: actions.payload.quantity} : item
            );
            return {
                ...state,
                items : updateQuantityItems,
                totalAmount : updateQuantityItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                ),
                totalItems : updateQuantityItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                )
            }
        }
        case CLEAR_CART :
            return initialState;
        default:
            return state; 
    }
}

export const ShoppingCartWithReducer = () =>{

    const [state, dispatch] =useReducer(reducer, initialState);
    const products = [
        {id : 1, name:"React Course", price : 49.99},
        {id : 2, name:"Node.js Course", price: 39.99},
        {id : 3, name:"JavaScript Bundle", price:89.99},
    ];



    return(
        <div>
            <h2>Products</h2>
            {
                products.map(products => (
                    <div key={products.id}>
                        <h3>{products.name} - ${products.price}</h3>
                        <button onClick={() => dispatch({
                            type: ADD_ITEM,
                            payload: products,
                        })}>Add to Cart</button>
                    </div>
                ))
            }

            <div>
                <h2>Shopping cart</h2>
                {state.items.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        {
                            state.items.map((items) => (
                                <div key={items.id}>
                                    <p>
                                        {items.name} -${items.price} x {items.quantity}
                                    </p>
                                    <button onClick={() => dispatch({
                                        type: UPDATE_QUANTITY,
                                        payload: {id: items.id, quantity: items.quantity -1},
                                    })}>-</button>
                                    <button onClick={() => dispatch({
                                        type: UPDATE_QUANTITY,
                                        payload: {id: items.id, quantity: items.quantity +1},
                                    })}>+</button>
                                    <button onClick={() => dispatch({
                                        type: REMOVE_ITEMS,
                                        payload: {id: items.id},
                                    })}>Remove</button>
                                </div>
                            ))
                        }
                    </div>
                )}
                <h3>Total Items : {state.totalItems}</h3>
                <h3>Total Amount : {state.totalAmount.toFixed(2)} </h3>
                {
                  state.items.length > 0 && (
                    <button onClick={() => dispatch({ type: CLEAR_CART })}>Clear Cart</button>
                  )  
                }
            </div>
        </div>
    )
}