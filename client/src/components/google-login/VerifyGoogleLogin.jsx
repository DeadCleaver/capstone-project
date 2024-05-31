import React, { useContext, useEffect} from 'react'
import { UserContext } from '../../context/UserContextProvider'
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Loader from '../loader/Loader';

export default function LoginSpinner() {
    
    const { setUserToken } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLoginVerify = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            setUserToken(token);
            navigate("/")
        } else {
            navigate("/")   
        }
    }

    useEffect(() => {
        handleLoginVerify();
    }, [])
    

  return (
    <Container
        style={{ marginTop: "250px" }}
        className="d-flex justify-content-center"
      >
        <Loader />
      </Container>
  )
}
