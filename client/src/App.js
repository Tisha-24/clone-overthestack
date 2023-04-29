import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import ChatBot from "./components/Chatbot/ChatBot";
import icon from "../src/assets/chatbot.png"

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
        {isOpen ? (
          <ChatBot
          setIsOpen={setIsOpen}
          setIsVerified={setIsVerified}
          isVerified={isVerified}
          />
         ) :
         <button
         className="open-chatbot"
         onClick={() => setIsOpen((prev) => !prev)} 
         >
          <img src={icon} alt="icon" width ="50 px"/>
         </button>
        }
      </Router>
    </div>
  );
}

export default App;
