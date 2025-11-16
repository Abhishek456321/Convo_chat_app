import { IoChatbubbles } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSocket } from "./SocketProvider";
const NavBar = () => {
  const navigate = useNavigate();
  const store = useSocket();
  const logoutHandler = (): void => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      toast.success("logout successfully.");
      store?.socket?.disconnect();
      store?.setSocket(null);
      navigate("/");
    }
  };
  return (
    <nav className=" fixed top-0 h-[9vh] w-full flex justify-around items-center  shadow-md">
      <div className="flex justify-center items-center space-x-3">
        <IoChatbubbles size={40} color="blue"></IoChatbubbles>
        <p className="cursive text-blue-600 text-2xl font-bold">Convo</p>
      </div>
      <button
        onClick={logoutHandler}
        className="px-6 py-2 bg-blue-600 translate-x-60 text-white font-bold cursor-pointer hover:bg-blue-800"
      >
        LogOut
      </button>
    </nav>
  );
};

export default NavBar;
