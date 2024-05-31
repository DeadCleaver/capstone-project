import React from 'react'
import SessionAdd from '../../components/session-add/SessionAdd'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

export default function SessionEditor() {

  const params = useParams();
  const { sessionId } = params;

  return (
    <Row className='d-flex justify-content-center' style={{marginTop: "100px"}}>
        <Col xs={8}>
            <SessionAdd editSessionId={sessionId || null}/>
    </Col>
    </Row>
  )
}
