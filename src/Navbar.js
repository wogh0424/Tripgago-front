import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';
import GetNaverAPI from './GetNaverAPI';
import i18next from "./locales/i18n";
import { useTranslation } from "react-i18next";
import {changeLanguage} from "i18next";



function HeadBar() {
    const { t } = useTranslation();
    const lang = localStorage.getItem("lang");

    const changeLanguage = (lang) => {
        i18next.changeLanguage(lang);
    };

    useEffect(() => {
        if (lang === "english") {
            changeLanguage("en");
        }
        else if (lang === "japanese") {
            changeLanguage(("jp"))
        }else {
        } changeLanguage("ko");

    }, []);
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" id={"top-nav"}>
                <Navbar.Brand as={Link} to="/" className={"logo"}>Tripgago</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={"toggle"}/>
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="#home" className={"nav-distance"}>{t('header.Howtouse')}</Nav.Link>
                            <Nav.Link as={Link} to="/GetNaverAPI" className={"nav-distance"}>{t('header.restaurant-list')}</Nav.Link>
                            <Nav.Link as={Link} to="#link" className={"nav-distance"}>{t('header.flightinfo')}</Nav.Link>
                            <Nav.Link as={Link} to="#link" className={"nav-distance"}>{t('header.notify')}</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <NavDropdown title={t('header.languageChoice')} id="basic-nav-dropdown" className={"Dropdown"}>
                                <NavDropdown.Item onClick={ () => changeLanguage('ko') }>{t('header.ko')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={ () => changeLanguage('en') }>{t('header.eng')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={ () => changeLanguage('jp') }>{t('header.jpn')}</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" exact={true} />
                <Route path="/GetNaverAPI" exact={true} element={<GetNaverAPI />} />
            </Routes>
        </div>
    );
}
export default HeadBar;