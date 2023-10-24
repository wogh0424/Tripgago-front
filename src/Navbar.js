import React, {Component, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css'


function HeadBar() {
    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary" id={"top-nav"}>
            <Navbar.Brand href="#home" className={"logo"}>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className={"toggle"}/>
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className={"nav-distance"}>Home</Nav.Link>
                        <Nav.Link href="#link" className={"nav-distance"}>식당정보</Nav.Link>
                        <Nav.Link href="#link" className={"nav-distance"}>관광지정보</Nav.Link>
                        <Nav.Link href="#link" className={"nav-distance"}>축제정보</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <NavDropdown title="언어선택" id="basic-nav-dropdown" className={"Dropdown"}>
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}

export default HeadBar;