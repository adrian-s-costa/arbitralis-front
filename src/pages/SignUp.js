import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JWTContext from "../contexts/JWTContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function SignUp() {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    repeat_password: "",
    profile_pic:""
  })

  const notify = (text) => toast(text);

  const navigate = useNavigate();

  function insertUser(event){
    event.preventDefault();
        
    axios.post("http://localhost:3003/user/sign-up", userData)
    .then(()=>{
      navigate("/sign-in")
    })
    .catch(error => {
      notify(error.response.statusText)
    });  
  }

  return (
    <div className="flex w-1/1 lg:h-100%">
      <div className="flex w-1/3 flex-1 tall:h-100% taller:h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1687740375/download_ckkgul.png"
            alt="Arbitralis"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crie sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:h-100%">
          <form className="space-y-6" action="#" method="POST" onSubmit={insertUser}>
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
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Senha
              </label>
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
                  value={userData.password}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Repita a senha
              </label>
            
              <div className="mt-2">
                <input
                  id="rep_password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-2	block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e)=>{
                    setUserData({ ...userData, repeat_password: e.target.value })
                  }}
                  value={userData.repeat_password}
                />
              </div>
            </div>

            <div>
              <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                Foto de perfil (link)
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="pl-2	block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  padding
                  onChange={(e)=>{
                    setUserData({ ...userData, profile_pic: e.target.value })
                  }}
                  value={userData.profile_pic}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full mt-10 transition duration-300 justify-center rounded-md bg-[#2b1b65] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#fa3824] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Criar conta
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já tem conta?{' '}
            <Link to={"/sign-in"}>
              <a href="#" className="font-semibold leading-6 transition duration-300 text-[#2b1b65] hover:text-[#fa3824]">
                Faça Login
              </a>  
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer/>
      <img className="hidden lg:h-100% lg:w-2/3 lg:block" src={"https://res.cloudinary.com/dmo7nzytn/image/upload/v1687765265/sky-1365325_1920_nzugak.png"} />
    </div>
  );
}