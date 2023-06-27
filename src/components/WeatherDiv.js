import axios from "axios"
import { toast } from "react-toastify"

export default function WeatherDiv(props){

  const savedToken = localStorage.getItem('token');

  function deletePlace(id){
    axios.delete(`http://localhost:3003/weather/${id}`, { headers: { Authorization: `Bearer ${ savedToken }` } })
    .then(()=>{
      toast("Deletado com sucesso!")
    })
  }

  return(
    <div className="w-[100%] justify-around flex gap-4 ">
      <img className="w-[40px]" src={`https://openweathermap.org/img/wn/${props.icone}.png`}/>
      <p className="w-[40px] flex items-center">{props.graus}</p>
      <p className="w-[500px] flex items-center">{props.lugar}</p>
      <p className=" w-[150px] flex items-center" >{props.clima}</p>
      <button onClick={()=>{ deletePlace(props.id) }}>x</button>
    </div>
  )

}