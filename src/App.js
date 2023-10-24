// App.js
import React, {Component, useEffect, useState} from 'react';

import './App.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Mycomponent from './Navbar'
import ColorSchemesExample from "./Navbar";
import axios from 'axios';




function Example() {

    const [userData, setUserData] = useState('');

    useEffect(() => {
        axios.get('/api/users') // 스프링 부트 API 엔드포인트
            .then(response => {
                setUserData(response.data); // 상태 업데이트
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {userData}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}



class App extends Component {

    render() {
        return(
            <div>
                <ColorSchemesExample />
                <p>배포완료 1111</p>
                <Example />
            </div>
        )
    }
}

export default App;