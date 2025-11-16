import { useEffect, useState, type JSX } from "react";
import NavBar from "../components/NavBar";
import type { Ilogin } from "../interfaces/Ilogin";
import axios from "axios";
import Welcome from "../components/Welcome";
import type { IMessage } from "../interfaces/IMessage";
import MessageBox from "../components/MessageBox";
import { useSocket } from "../components/SocketProvider";
import { toast } from "react-toastify";

const ChatPage = (): JSX.Element => {
  const [user, setUser] = useState<Ilogin[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [currentReceiver, setCurrentReceiver] = useState("");
  const [active, setActive] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const store = useSocket();
  const getAllUser = async () => {
    const res = await axios.get("http://localhost:4000/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data.success) {
      setUser(res.data.data);
    }
  };
  const clickHandler = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/message/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        if (show === false) {
          setShow(!show);
        }

        setActive(id);
        setCurrentReceiver(id);
        setMessages(res.data.data);
      }
    } catch (error) {
      toast.error("error in network request.");
    }
  };
  useEffect(() => {
    getAllUser();
    store?.socket?.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <div className="flex fixed top-27 left-4 h-[86vh] w-screen ">
        <div className="flex  flex-col bg-black/10 w-[25%] shadow-md space-y-5 rounded-md overflow-y-auto">
          <p className="text-center fixed w-[24.2%] bg-blue-600   cursive text-white font-extrabold text-2xl py-5">
            All Users
          </p>
          <div className="mt-20">
            {user?.map((i) => (
              <div
                key={i._id}
                className={
                  active === i._id
                    ? "flex justify-start items-center gap-5 space-y-5 bg-black/20 px-7 cursor-pointer"
                    : "flex justify-start items-center gap-5 space-y-5 hover:bg-black/20 px-7 cursor-pointer"
                }
                onClick={() => {
                  clickHandler(i._id as string);
                }}
              >
                <img
                  className="w-[10%] h-[10%] object-cover rounded-full items-center justify-center pt-4"
                  src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                />
                <p className="flex justify-center items-center font-bold ">
                  {i.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[73%] ml-3 bg-black/5  flex justify-center items-center shadow-md ">
          {show ? (
            <MessageBox
              message={messages}
              currentReceiver={currentReceiver}
            ></MessageBox>
          ) : (
            <Welcome></Welcome>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
