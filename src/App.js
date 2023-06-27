import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import JWTContext from './contexts/JWTContext';
import { useState } from 'react';

export default function App (){

  const [token, setToken] = useState('');
  const [userDataContext, setUserDataContext] = useState({});
  const contextValue = { token, setToken, userDataContext, setUserDataContext }

  return(
    <>
      <BrowserRouter>
      <JWTContext.Provider value={contextValue}>      
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/sign-in" element={<SignIn />}/>
            <Route path="/sign-up" element={<SignUp />}/>
          </Routes>
        </JWTContext.Provider>  
      </BrowserRouter>
    </>
    )
}