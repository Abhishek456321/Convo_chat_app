import axios from "axios";
import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { GiFastBackwardButton } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import type { IuserUpdate } from "../interfaces/IuserUpdate";
import { toast } from "react-toastify";

const UpdateAccount = (): JSX.Element => {
  const navigate = useNavigate();
  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const res = await axios.patch(
      "http://localhost:4000/api/user/update",
      update
    );
    if (res.data.success) {
      toast.success(res.data.message);
      setUpdate({
        email: "",
        oldPassword: "",
        newPassword: "",
      });
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  };
  const [update, setUpdate] = useState<IuserUpdate>({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className=" fixed top-0 h-screen w-screen bg-blue-800 flex justify-center items-center ">
      <form
        onSubmit={submitHandler}
        className="bg-white h-[50vh] w-1/4 shadow-md shadow-blue-800 rounded-2xl flex flex-col items-center "
      >
        <p className="text-3xl cursive text-blue-600 font-bold text-center mt-8">
          Update Account
        </p>
        <div className="flex flex-col justify-center items-center h-[70%] w-full space-y-7 -translate-y-8">
          <input
            className="w-[80%] h-[15%] pl-2 border border-blue-600 rounded font-bold"
            type="email"
            name="email"
            placeholder="Email"
            value={update.email}
            onChange={changeHandler}
            required
          />
          <input
            className="w-[80%] h-[15%] pl-2 border border-blue-600 rounded font-bold"
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={update.oldPassword}
            onChange={changeHandler}
            required
          />
          <input
            className="w-[80%] h-[15%] pl-2 border border-blue-600 rounded font-bold"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={update.newPassword}
            onChange={changeHandler}
            required
          />
        </div>

        <button
          className="border  border-blue-600 hover:bg-blue-900  -translate-y-12 bg-blue-600 text-white px-5 py-2 font-bold cursor-pointer"
          type="submit"
        >
          Update Account
        </button>
      </form>
      <GiFastBackwardButton
        color="blue"
        size={60}
        className="p-4 absolute top-20 right-32 rounded-4xl bg-white cursor-pointer animate-bounce"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default UpdateAccount;
