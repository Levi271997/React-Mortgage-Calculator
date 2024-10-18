import { useContext, useRef, useState } from "react";
import calculatoricon from "./assets/images/icon-calculator.svg";
import { tab } from "@testing-library/user-event/dist/tab";

import { useResult } from "./context/resultsContext";

export default function CalculatorForm(){

    return(
        <Form/>
    )
}

function Form(){
    const requiredFieldError = "This field is required";
    const [inputs, setInputs] = useState({
        mortgageAmount:"",
        mortgageTerm:"",
        mortgageInterest:"",
        mortgageType:""
    });


    const P= inputs.mortgageAmount;
    const r= (inputs.mortgageInterest / 100) / 12;
    const n= inputs.mortgageTerm * 12;

    const formRef = useRef(null)
   
    const { totalAmount, updateTotalAmount } = useResult();


    const handleInputs =(e)=>{
        const inputValue = e.target.value;
        const inputName = e.target.name;
       const isNumber = /^[0-9]*\.?[0-9]*$/.test(inputValue); 
    if (isNumber || inputValue === '') {
        setInputs(() =>({
            ...inputs,
            [inputName]:inputValue,
        }));
    }
        } 
const handleRadioSelections = (e) =>{
    const selectedOption = e.target.value;
    setInputs(() =>({
        ...inputs,
        mortgageType:selectedOption,
    }));
}

const ClearAll =()=>{
 
    setInputs(()=>({
        ...inputs,
        mortgageAmount:"",
        mortgageTerm:"",
        mortgageInterest:"",
        mortgageType:""
    }));

    formRef.current.reset();

    updateTotalAmount(
        { 
            monthlyRepayments:0,
            totalRepay:0
        }
    );
}


const CalculateMonthlyRepayments = ()=>{
   
    const exponential = Math.pow((1 + r), n ); 
    const numerator = r * exponential;
    const denominator = exponential - 1;
    const M = (P * (numerator / denominator)).toFixed(2);
    return M;
}

const CalculateTermTotalRepay = (totalamount) => {
    return totalamount * (inputs.mortgageTerm * 12);
}

const CalculateMonthlyRepaymentInterest = () =>{ 
   return Number((P * r)).toFixed(2);
}
const CalculateTermTotalRepayInterest = () =>{
    const mir = CalculateMonthlyRepaymentInterest();
    return Number((mir * n) + Number(P) ).toFixed(2);
}

const HandleCalculations = (e)=>{
    e.preventDefault();
 
    const calculatedAmount =  inputs.mortgageType === "repayment" ? CalculateMonthlyRepayments() : CalculateMonthlyRepaymentInterest() ; 
    const totalRepayOverTerm = inputs.mortgageType === "repayment" ? CalculateTermTotalRepay(calculatedAmount) : CalculateTermTotalRepayInterest();


    updateTotalAmount({ 
            monthlyRepayments:calculatedAmount,
            totalRepay:totalRepayOverTerm
        });
   
}
    return(
        <>
        <div className='heading-bar'>
            <h1 className='title'>Mortgage Calculator</h1>
            <button id='clearAll' onClick={ClearAll}>Clear All</button>
        </div>
        <form onSubmit={HandleCalculations} ref={formRef}>
            <div className="fields fields-col-100">
                <label htmlFor="amount">Mortgage Amount</label>
                <div className="inputholder">
                    <span>£</span>
                    <input type="text" name="mortgageAmount" onChange={ handleInputs } value={inputs.mortgageAmount} required/>
                </div>
                <div className="error-holder">{requiredFieldError}</div>
            </div>
            <div className="fields fields-col-50">
                <label htmlFor="amount">Mortgage Term</label>
                <div className="inputholder">                   
                    <input type="text"name="mortgageTerm" onChange={handleInputs} value={inputs.mortgageTerm} required/>
                    <span>Years</span>
                </div>
                <div className="error-holder">{requiredFieldError}</div>
            </div>
            <div className="fields fields-col-50">
                <label htmlFor="amount">Interest Rate</label>
                <div className="inputholder">   
                    <input type="text" name="mortgageInterest" onChange={ handleInputs } value={inputs.mortgageInterest} required/>
                    <span>%</span>
                </div>
                <div className="error-holder">{requiredFieldError}</div>
            </div>
            <div className="fields fields-col-100">
                <label htmlFor="amount">Mortgage Type</label>
                <div className="mt-type">
                   <div className="radio-group">
                     <div className="customRadio">
                        <input name="mortgageType" type="radio" value="repayment"  onChange={ handleRadioSelections } required/>
                     </div>
                     <span>Repayment</span>
                   </div>
                   <div className="radio-group">
                     <div className="customRadio">
                        <input name="mortgageType" type="radio" value="interest"  onChange={ handleRadioSelections   } required/>
                     </div>
                     <span>Interest Only</span>
                   </div>
                </div>
                <div className="error-holder">{requiredFieldError}</div>
            </div>

            <button type="submit">
                <img src={calculatoricon} alt="calculator icon"/>
                Calculate Repayments
            </button>

        </form>
        </>
    )


    
 
}


