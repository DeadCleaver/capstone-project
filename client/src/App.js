import GameNav from "./components/game-nav/GameNav";
import Home from "./views/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./views/register/Register";
import { useEffect, useState } from "react";
import SessionDetails from "./views/sessiondetails/SessionDetails";
import UserContextProvider from "./context/UserContextProvider";
import Profile from "./views/profile/Profile";
import SessionsManager from "./views/sessions-manager/SessionsManager";
import GamesManager from "./views/games-manager/GamesManager";
import GameFooter from "./components/game-footer/GameFooter";
import SessionEditor from "./views/session-editor/SessionEditor";
import ProtectedAuthRoute from "./context/ProtectedAuthRoute";
import NotFound from "./views/notfound/NotFound";
import VerifyGoogleLogin from "./components/google-login/VerifyGoogleLogin"

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
          <div id="root">
            <div className="app-container">
              <GameNav />
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" exact element={<Home />} />
                <Route path="/gamesession/:id" element={<SessionDetails />} />

                <Route path="/verifylogin" element={<VerifyGoogleLogin />} />

                {/* Route da proteggere */}
                <Route element={<ProtectedAuthRoute />}>
                  <Route path="/profile" exact element={<Profile />} />
                  <Route path="/sessions" exact element={<SessionsManager />} />
                  <Route path="/games" exact element={<GamesManager />} />
                  <Route path="/session" element={<SessionEditor />} />
                  <Route
                    path="/session/:sessionId"
                    element={<SessionEditor />}
                  />
                </Route>

                <Route path="/*" element={<NotFound />} />
              </Routes>
            </div>
            <GameFooter />
          </div>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
