// App.js
import React, {Component, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import HeadBar from "./Navbar";
import Maincontents from "./Main-content";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* 모든페이지에는 HeadBar가 포함 */}
                    <HeadBar />

                    <Routes>
                        {/* 메인페이지에는 사진이 포함(페이지별로 분류) */}
                        <Route path="/" element={<Maincontents />} />

                        <Route path="/GetNaverAPI" />
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;