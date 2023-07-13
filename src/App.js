import { useState } from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import CalcData from './Components/CalcData';

function App() {
  const [data,setData] = useState(null);

  const calculateHandler = (userInput) => {
    setData(userInput); 
  }

  const yearlyData = [];

    if(data){
      let currentSavings = +data['current-savings']; 
      const yearlyContribution = +data['yearly-contribution']; 
      const expectedReturn = +data['expected-return'] / 100;
      const duration = +data['duration'];
  
      for (let i = 0; i < duration; i++) {
        const yearlyInterest = currentSavings * expectedReturn;
        currentSavings += yearlyInterest + yearlyContribution;
        yearlyData.push({
          year: i + 1,
          yearlyInterest: yearlyInterest,
          savingsEndOfYear: currentSavings,
          yearlyContribution: yearlyContribution,
        });
    }

    
  };

  return (
    <div>
      <Header />
      <Form data = {calculateHandler}/>
      {!data && <p style ={{textAlign:'center'}}>No Data Found</p>}
      {data && <CalcData values = {yearlyData} initialInvestment = {data['current-savings']} />}
    </div>
  );
}

export default App;
