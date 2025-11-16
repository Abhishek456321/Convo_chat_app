import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccount";
import UpdateAccount from "./pages/UpdateAccount";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/register"
          element={<CreateAccount></CreateAccount>}
        ></Route>
        <Route path="/update" element={<UpdateAccount></UpdateAccount>}></Route>
        <Route path="/chat" element={<ChatPage></ChatPage>}></Route>
      </Routes>
    </>
  );
};
export default App;
