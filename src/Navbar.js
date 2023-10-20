import React, {Component, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark" expand={"md"}>
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="me-auto">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            {window.innerWidth > 576 && <Nav.Link href="#features">Features</Nav.Link>}
                            {window.innerWidth > 768 && <Nav.Link href="#pricing">Pricing</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default ColorSchemesExample;