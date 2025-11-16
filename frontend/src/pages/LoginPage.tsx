import { Link, useNavigate } from "react-router-dom";
import { TbUserEdit } from "react-icons/tb";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type JSX,
} from "react";
import type { IloginP } from "../interfaces/Ilogin";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useSocket } from "../components/SocketProvider";

const LoginPage = (): JSX.Element => {
  const store = useSocket();
  const navigate = useNavigate();
  const connectSocket = (id: string) => {
    const socket_io = io("http://localhost:4000", {
      query: {
        user: id,
      },
    });
    store?.setSocket(socket_io);
  };
  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/api/user/login", login);
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      setLogin({
        email: "",
        password: "",
      });
      connectSocket(res.data.id);
      navigate("/chat");
    } else {
      toast.error(res.data.message);
    }
  };
  const [login, setLogin] = useState<IloginP>({
    email: "",
    password: "",
  });
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {}, []);

  return (
    <div className=" fixed top-0 h-screen w-screen bg-blue-800 flex justify-center items-center ">
      <form
        onSubmit={submitHandler}
        className="bg-white h-[50vh] w-1/4 shadow-md shadow-blue-800 rounded-2xl flex flex-col items-center "
      >
        <p className="text-3xl cursive text-blue-600 font-bold text-center mt-8">
          Login
        </p>
        <div className="flex flex-col justify-center items-center h-[70%] w-full space-y-7 -translate-y-10">
          <input
            className="w-[80%] h-[15%] pl-2 border border-blue-600 rounded font-bold"
            type="email"
            name="email"
            placeholder="Email"
            value={login.email}
            onChange={changeHandler}
            required
          />
          <input
            className="w-[80%] h-[15%] pl-2 border border-blue-600 rounded font-bold"
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={changeHandler}
            required
          />
        </div>

        <button
          className="border  border-blue-600  -translate-y-25 hover:bg-blue-900 bg-blue-600 text-white px-6 py-2 font-bold cursor-pointer"
          type="submit"
        >
          Login
        </button>
        <Link
          to="/register"
          className="underline -translate-y-18 cursive  text-[19px] font-bold text-blue-600 cursor-pointer"
        >
          Create Account
        </Link>
      </form>
      <TbUserEdit
        color="blue"
        size={60}
        className="p-4 absolute top-20 right-32 rounded-4xl bg-white cursor-pointer animate-bounce"
        onClick={() => navigate("/update")}
      />
    </div>
  );
};

export default LoginPage;
