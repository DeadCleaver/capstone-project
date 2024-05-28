import React, { useState, useEffect, useContext } from "react";
import Author from "../author/Author";
import { Container, Card, Stack, Button, CardHeader } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { HiUserAdd } from "react-icons/hi";
import { UserContext } from "../../context/UserContextProvider";
import { useLocation } from "react-router-dom";
import AddPlayerModal from "../addplayer-modal/AddPlayerModal";

export default function PlayersList({ players, isCreator }) {
  const { userData } = useContext(UserContext);
  const location = useLocation();

  const [showAddPlayer, setShowAddPlayer] = useState(false); 

  const toggleAddPlayerModal = () => {
    setShowAddPlayer(!showAddPlayer);
    };

  return (
    <Card className="border-blueviolet">
      <CardHeader className="bg-blueviolet text-white f-silkscreen f-s-10">
        <Stack direction="horizontal" className="justify-content-between"> 
          <div>Lista Giocatori</div> 
          <Button variant="success" className="border-white f-s-8">
            <HiUserAdd/><span> Aggiungi Giocatore</span> 
          </Button>
        </Stack>
      </CardHeader>
      {players &&
        players.map((player, index) => (
          <Stack
            direction="horizontal"
            className="p-2 m-1 justify-content-between"
          >
            <Author {...player} />
            {(isCreator || (userData && userData.email === player.email)) && (
              <Button className="bg-transparent border-0 text-danger fs-2" onClick={toggleAddPlayerModal}>
                <IoIosCloseCircle />
              </Button>
            )}
          </Stack>
        ))}
        <AddPlayerModal showAddPlayer={showAddPlayer} setShowAddPlayer={setShowAddPlayer}/>
    </Card>
  );
}
