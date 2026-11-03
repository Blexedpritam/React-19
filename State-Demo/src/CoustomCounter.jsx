import { useReducer } from "react"

const init = (initial) => {
    if ( typeof initial === "function"){
        return initial();
    };

    return initial;
};

const useStateCoustom = (initialValue) => {
    const reducer = (state , action) => {
        if(typeof action === "function"){
            return action(state);
        }
        return action;
    };

    const [state, dispatch] = useReducer(reducer , initialValue, init);

    const setState = (newValue) => {
        dispatch(newValue);   
    };

    return [state, setState];
};

export const CoustomCounter = () => {

    const [count , setCount] =useStateCoustom(0);

    const [data, setData] = useStateCoustom ( () => {
        console.log("Expensive Computation");
        return Array (100).fill(0);
    });

    return <div>
        <p>Count : {count}</p>
        <button onClick={() => setCount (count + 1)}>Increments</button>
        <button onClick={() => setCount (count - 1)}>Decrements</button>
        <button onClick={() => setCount(0)}>Rest</button>
        <button onClick={() => setCount ((prev) => prev + 1 )}>Increments With Functions</button>


    </div>;

};