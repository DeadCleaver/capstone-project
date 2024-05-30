import React from 'react'
import SessionAdd from '../../components/session-add/SessionAdd'
import { Card, CardBody, CardHeader, Row, Col } from 'react-bootstrap'

export default function SessionEditor() {

  return (
    <Row className='d-flex justify-content-center' style={{marginTop: "100px"}}>
        <Col xs={8}>
    <Card className='border-blueviolet'>
        <CardHeader className='bg-blueviolet f-silkscreen text-white'>
            Crea sessione di gioco
        </CardHeader>
        <CardBody>
            <SessionAdd/>
        </CardBody>
    </Card>
    </Col>
    </Row>
  )
}
