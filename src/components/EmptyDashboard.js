export default function EmptyDashboard(props){
  return (  
    <div className="h-full flex flex-col justify-center">
      <div className="text-[50px] mb-[10px] flex justify-center">
        <ion-icon name="rainy"></ion-icon>
      </div>
      <p className="text-sm">Nenhuma cidade sendo monitorada</p>
      <button
          type="submit"
          className="flex w-full transition duration-300 justify-center rounded-md bg-[#2b1b65] mt-[10px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#fa3824] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={()=>{props.setOpen(true)}}
        >
          Adicionar +
        </button>
    </div>
  )
}