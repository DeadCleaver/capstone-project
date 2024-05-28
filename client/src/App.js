import GameNav from "./components/game-nav/GameNav";
import Home from "./views/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./views/register/Register";
import { useEffect, useState } from "react";
import SessionDetails from "./views/sessiondetails/SessionDetails";
import UserContextProvider from "./context/UserContextProvider";
import UserPanel from "./views/user-panel/UserPanel";
import Profile from "./views/profile/Profile";

function App() {
  /* const [sessions, setSessions] = useState([]);


  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}gamesession/`);

      if (!response.ok) {
        throw new Error("Errore nel recupero delle informazioni");
      }

      const sessionsdata = await response.json();
      setSessions(sessionsdata);
    } catch (error) {
      console.error("Errore nella chiamata al server: ", error);
    }
  }; */

  return (
    <div>
      <UserContextProvider>
        <Router>
          <GameNav />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" exact element={<Home />} />
            <Route
              path="/gamesession/:id"
              element={<SessionDetails />}
            />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/sessions" exact element={<UserPanel />} />


          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
