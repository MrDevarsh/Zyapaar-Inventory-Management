import "./App.css";
import Home from "./Components/Home/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="app">
        <ToastContainer />
        {/* <div className="table"> */}
        <Home />
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
