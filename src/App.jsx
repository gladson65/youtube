import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import './App.css'

function App() {
  
  const [isSideBar, setIsSideBar] = useState(false);
  
  return (
    <>
      <Header isSideBar={isSideBar} setIsSideBar={setIsSideBar}/>
      <Outlet context={[isSideBar]}/>
    </>
  )
}

export default App;
