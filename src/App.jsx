import { useSelector } from "react-redux";
import MainCard from "./components/MainCard";

function App() {
  const addTask = useSelector((state) => state.taskList.value)
  console.log(addTask)
  return (
    <>
      <div className="w-full h-[100px] flex justify-center items-center bg-orange-100 border-solid border-2 border-black"><span className="text-4xl">Kanban Board</span></div>
      <div className="w-full h-full flex flex-row flex-grow-1 gap-4 justify-around items-center bg-slate-300">
        <MainCard title="Todos" />
        <MainCard title="In Progress" />
        <MainCard title="Peer Review" />
        <MainCard title="Done" />
      </div>
    </>
  );
}

export default App;
