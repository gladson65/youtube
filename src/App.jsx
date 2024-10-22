import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Provider } from 'react-redux';
import appStore from './Utils/appStore';
import './App.css'

function App() {
  
  const [isSideBar, setIsSideBar] = useState(false);
  const [ filteredContent, setFilteredContent ] = useState([]);
  
  return (
    <>
      <Provider store={appStore}>
        <Header isSideBar={isSideBar} setIsSideBar={setIsSideBar} setFilteredContent={setFilteredContent}/>
        <Outlet context={[isSideBar, filteredContent]} />
      </Provider>
    </>
  )
}

export default App;
