import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import type { Ilogin } from "../interfaces/Ilogin";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GiFastBackwardButton } from "react-icons/gi";

const CreateAccount = (): JSX.Element => {
  const navigate = useNavigate();
  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/api/user/create",
      register
    );
    if (res.data.success) {
      toast.success(res.data.message);
      setRegister({
        name: "",
        email: "",
        password: "",
      });
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  };
  const [register, setRegister] = useState<Ilogin>({
    name: "",
    email: "",
    password: "",
  });
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className=" fixed top-0 h-screen w-screen bg-blue-800 flex justify-center items-center ">
      <form
        onSubmit={submitHandler}
        className="bg-white h-[50vh] w-1/4 shadow-md shadow-blue-800 rounded-2xl flex flex-col items-center "
      >
        <p className="text-3xl text-blue-600 font-bold text-center mt-8 cursive">
          Create Account
        </p>
        <div className="flex flex-col justify-center items-center h-[70%] w-full space-y-7 -translate-y-10">
          <input
            className="w-[80%] h-[15%] pl-2 border border-blue-600 rounded font-bold"
            type="text"
            name="name"
            placeholder="Username"
            value={register.name}
            onChange={changeHandler}
            required
          />
          <input
            className="w-[80%] h-[15%] pl-2 border border-blue-600 rounded font-bold"
            type="email"
            name="email"
            placeholder="Email"
            value={register.email}
            onChange={changeHandler}
            required
          />
          <input
            className="w-[80%] h-[15%] pl-2 border border-blue-600 rounded font-bold"
            type="password"
            name="password"
            placeholder="Password"
            value={register.password}
            onChange={changeHandler}
            required
          />
        </div>

        <button
          className="border  border-blue-600 hover:bg-blue-900  -translate-y-18 bg-blue-600 text-white px-5 py-2 font-bold cursor-pointer"
          type="submit"
        >
          Create Account
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

export default CreateAccount;
