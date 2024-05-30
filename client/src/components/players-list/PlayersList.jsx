import React, { useState, useEffect, useContext } from "react";
import Author from "../author/Author";
import { Card, Stack, Button, CardHeader } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { UserContext } from "../../context/UserContextProvider";
import AddPlayer from "../add-player/AddPlayer";

export default function PlayersList({
  players,
  isCreator,
  sessionId,
  refresh,
  open,
}) {
  const { userData, userToken } = useContext(UserContext);

  const handleDeletePlayer = async (playerId) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler rimuovere il giocatore?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}gamesession/${sessionId}/players/${playerId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del giocatore");
      }

      refresh();
    } catch (error) {
      console.error("Errore durante l'eliminazione del giocatore: ", error);
    }
  };

  return (
    <Card className="border-blueviolet">
      <CardHeader className="bg-blueviolet text-white f-silkscreen f-s-10 text-center">
        Lista Giocatori
      </CardHeader>
      {players &&
        players.map((player, index) => (
          <Stack
            key={index}
            direction="horizontal"
            className="p-2 m-1 justify-content-between"
          >
            <Author {...player} />
            {(isCreator || (userData && userData.email === player.email)) && (
              <Button
                className="bg-transparent border-0 text-danger fs-2"
                onClick={() => handleDeletePlayer(player._id)}
              >
                <IoIosCloseCircle />
              </Button>
            )}
          </Stack>
        ))}
      {open && <AddPlayer sessionId={sessionId} refresh={refresh} />}
    </Card>
  );
}
