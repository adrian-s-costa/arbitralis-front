import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JWTContext from "../contexts/JWTContext";
import { useContext } from "react";
const config = require('../config.json');

export default function SignIn() {

  console.log(config.api_url);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const { setToken, setUserDataContext } = useContext(JWTContext);

  const notify = (text) => toast(text);

  const saveToken = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  const saveUserData = (userData) => {
    localStorage.setItem('userData', userData)
    setUserDataContext(userData);
  }

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  function sendUserData(event){
    event.preventDefault();
    
    axios.post(config.api_url + '/auth/login', userData)
    .then((res)=>{
      saveToken(res.data.access_token);
      axios.get( config.api_url + '/auth/profile', { headers: { Authorization: `Bearer ${res.data.access_token}` } })
      .then((res)=>{
        saveUserData(JSON.stringify(res.data));
        navigate("/dashboard");
      })
      .catch(notify("Houve algum problema no login"));
    })
    .catch(notify("Deslogado"));
  }

  return (
    <div className="flex w-1/1 lg:h-100%">
      <div className="flex tall:h-100% taller:h-screen w-1/3 flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1687740375/download_ckkgul.png"
            alt="Arbitralis"
            onClick={()=>{navigate("/")}}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Logue em sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={sendUserData}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-2	block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  padding
                  onChange={(e)=>{
                    setUserData({ ...userData, email: e.target.value })
                  }}
                  value={userData.email}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold transition duration-300 text-[#2b1b65] hover:text-[#fa3824]">
                    Esqueci a senha
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-2	block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e)=>{
                    setUserData({ ...userData, password: e.target.value })
                  }}
                  value={ userData.password }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full transition duration-300 justify-center rounded-md bg-[#2b1b65] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#fa3824] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Ainda não tem conta?{' '}
            <Link to={"/sign-up"}>
              <a href="#" className="font-semibold leading-6 transition duration-300 text-[#2b1b65] hover:text-[#fa3824]">
                Cadastre-se
              </a>  
            </Link>
          </p>
        </div>
      </div>
      <img src={"https://res.cloudinary.com/dmo7nzytn/image/upload/v1687765042/clouds-2329680_1280_fax81v.png"} className="hidden lg:block lg:h-screen w-2/3"/>
      <ToastContainer />
    </div>
  );
}