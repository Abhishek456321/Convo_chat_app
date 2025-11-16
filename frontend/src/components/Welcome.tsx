import { RiWechatFill } from "react-icons/ri";
const Welcome = () => {
  return (
    <div className="flex justify-center items-center space-x-3">
      <RiWechatFill size={200} color="blue"></RiWechatFill>
      <p className=" font-bold cursive text-[4rem] text-blue-700">
        Welcome to Convo....
      </p>
    </div>
  );
};

export default Welcome;
