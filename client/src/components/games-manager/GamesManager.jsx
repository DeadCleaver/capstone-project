import React, {useState} from 'react'
import { Container, Table, Button } from 'react-bootstrap'

export default function GamesManager({games}) {

  return (
   <Container>
 <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Descrizione</th>
            <th>Opzioni</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <td>{game.gametitle}</td>
              <td>{game.gamedescription}</td>
              <td>
                <Button
                  variant="warning"
                  /* onClick={() => handleEdit(game._id)} */
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  /* onClick={() => handleDelete(game._id)} */
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        </Table>
   </Container>
  )
}
