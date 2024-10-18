
import './App.scss';
import Results from './results';
import CalculatorForm from './CalculatorForm';
import { useState, useRef } from 'react';
import { ResultsProvider } from './context/resultsContext';
import illustrationEmpty from './assets/images/illustration-empty.svg'; 

const App = ()=> {


  return (
   
    <ResultsProvider>
   
    <div id='app-body'>
    <div id='calculator-wrapper'>
        <div className='calculator'>
            <div className='form-container'>
                <CalculatorForm/>
            </div>
            <div className='result-container'>
          
           
              <Results/>
          
                 
                 
            </div>
        </div>
    </div>
  </div>
  </ResultsProvider>
 
  );
}


export default App;
