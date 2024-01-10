import './App.css';
import Leftbar from './components/leftbar/leftbar';
import Dashboard from './components/dashboard/dashboard';
import { useState } from 'react';

function App() {
  const [showData, setShowData] = useState(false); 
  
  const [selectedData, setSelectedData] = useState('');
  const [selectedSubMineData, setSelectedSubMineData] = useState(''); 
  console.log(selectedData)
  return (    
    <div className="main" id="main">
        <Leftbar 
        setShowData={setShowData} 
        setSelectedData={setSelectedData}
        setSelectedSubMineData={setSelectedSubMineData}/>
        <Dashboard 
          shouldShowData={showData} 
          selectedData={selectedData}
          selectedSubMineData={selectedSubMineData}/>
      </div>
  );
}

export default App;
