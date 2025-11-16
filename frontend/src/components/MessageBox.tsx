import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { IMessage } from "../interfaces/IMessage";
import { IoIosSend } from "react-icons/io";
import axios from "axios";

const MessageBox = ({
  message,
  currentReceiver,
}: {
  message: IMessage[];
  currentReceiver: string;
}) => {
  const [text, setText] = useState<string>("");
  const scroll = useRef<HTMLParagraphElement>(null);
  const handleClick = async () => {
    const res = await axios.post(
      `http://localhost:4000/api/message/${currentReceiver}`,
      {
        text: text,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      setText("");
    }
  };
  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  return (
    <div className=" h-full w-full flex flex-col ">
      <div className="relative h-[86%] w-full overflow-y-auto ">
        {message?.map((i) => (
          <p
            key={i._id}
            className={
              i.sender === currentReceiver
                ? " bg-blue-500/30 ml-5 rounded-2xl my-9  w-[30%] px-5 py-3  text-black text-[16px] font-bold "
                : "translate-x-233  bg-violet-500/30 ml-3  rounded-2xl my-9 w-[30%] px-5  py-3 text-black text-[16px] font-bold "
            }
            ref={scroll}
          >
            {i.text}
          </p>
        ))}
      </div>
      <div className=" flex justify-center items-center fixed bottom-6 bg-white  h-[8%] p-10 pt-15 rounded-3xl shadow-md w-[73%]">
        <input
          type="text"
          className=" ml-7 w-[70%] border  -translate-y-2 rounded-3xl p-5 shadow-md"
          placeholder="Send Message"
          name="text"
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <IoIosSend
          color="blue"
          size={40}
          className="ml-7 text-center -translate-y-2  cursor-pointer hover:scale-130"
          onClick={handleClick}
        ></IoIosSend>
      </div>
    </div>
  );
};

export default MessageBox;
