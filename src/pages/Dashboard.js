import Header from "../components/Header";
import ModalInput from "../components/ModalInput";
import JWTContext from "../contexts/JWTContext";
import axios from "axios";
import WeatherDiv from "../components/WeatherDiv";
import EmptyDashboard from "../components/EmptyDashboard";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from 'react';
import { debounce } from 'lodash';
const config = require('../config.json');

export default function Dashboard(){

  const [open, setOpen] = useState(false);
  const { setToken, setUserDataContext } = useContext(JWTContext);
  const [ weatherArray, setWeatherArray] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          setToken(savedToken);
        }
  
        const savedUser = JSON.parse(localStorage.getItem('userData'));
        if (savedUser) {
          setUserDataContext(savedUser);
        }
  
        const response = await axios.get(config.api_url + `/weather/${savedUser.userId}`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
  
        setWeatherArray(response.data.reverse());
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        navigate('/sign-in');
      }
    };

    const debouncedFetchData = debounce(fetchData, 1000);

    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel();
    };
  }, [weatherArray]);

  const updateWeatherArray = async () => {
    try {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
      }

      const savedUser = JSON.parse(localStorage.getItem('userData'));
      if (savedUser) {
        setUserDataContext(savedUser);
      }

      const response = await axios.get(config.api_url + `/weather/${savedUser.userId}`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      });

      setWeatherArray(response.data.reverse());
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
      navigate('/sign-in');
    }
  };

  return(
    <>
      <Header open={ open } setOpen={ setOpen } />
      <ModalInput open={ open } setOpen={ setOpen } />
      <div className="w-screen h-screen tall:h-fit flex flex-col items-center bg-[#f9fafc]">
        <h2 className="mt-[80px] mb-[20px] text-2xl font-bold w-[76rem]">Dashboard climas</h2>
        <div className={`w-[76rem] pt-[10px] h-fit min-h-[700px] overflow-auto bg-white rounded-lg flex items-center flex-col`}>
          {
            weatherArray.length === 0 ? <EmptyDashboard open={ open } setOpen={ setOpen } /> :
            weatherArray.map((w)=>(
              <WeatherDiv id={w.id} graus={w.graus} lugar={w.lugar} icone={w.icone} clima={w.clima} />
            ))
          }
        </div>
      </div>
      <ToastContainer />
    </>
  )
}