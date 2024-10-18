import { createContext, useContext, useState } from "react";

const ResultsContext = createContext(0);
export const ResultsProvider = ({children}) =>{
    const [totalAmount, setTotalAmount] = useState({
        monthlyRepayments:0,
        totalRepay:0
    });

    const updateTotalAmount = (newAmount) =>{
        setTotalAmount(prevAmount =>({
            ...prevAmount,
            ...newAmount
        }));
    }
    return(
        <ResultsContext.Provider value={{ totalAmount, updateTotalAmount }}>
            {children}
        </ResultsContext.Provider>
    )
};
export const useResult = () => useContext(ResultsContext);

// import { createContext, useContext, useState } from "react";

// const ResultsContext = createContext(0);
// export const ResultsProvider = ({children}) =>{
//     const [totalAmount, setTotalAmount] = useState(0);

//     const updateTotalAmount = (newAmount) =>{
//         setTotalAmount(newAmount);
//     }
//     return(
//         <ResultsContext.Provider value={{ totalAmount, updateTotalAmount }}>
//             {children}
//         </ResultsContext.Provider>
//     )
// };
// export const useResult = () => useContext(ResultsContext);