import React from 'react';
import illustrationEmpty from './assets/images/illustration-empty.svg'; 
import  { useResult }  from './context/resultsContext';

const Results =()=> {
    const {totalAmount} =  useResult();
     return (totalAmount.monthlyRepayments > 0 ? <ResultsView/> : <EmptyResult/> )
}

export default Results;

const FormatCurrency=(amount)=>{
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const EmptyResult = () =>{
    return(
        <div className='resultswrap'>
            <img src={illustrationEmpty} alt='empty results icon' className='empty-result'/>
            <p className='title'>Results shown here</p>
            <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
        </div>  
    )
}

const ResultsView = () =>{
    const {totalAmount} =  useResult();
    return(
        <div className='resultswrap w-result'>
            <p className='title'>Results shown here</p>
        <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
    
        <div id="resultsview">
            
        <p>Your monthly repayments</p>
        <div id="total-repay">£ {FormatCurrency(totalAmount.monthlyRepayments)}</div>

        
        <div className="spacer"></div>
        <p>Total you'll repay over the team</p>
        <div className="total-over-term">£ {FormatCurrency(totalAmount.totalRepay)} </div>
    </div>
        </div>
    )
}