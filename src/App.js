// App.js
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    state = {
        userData: '',
    };

    componentDidMount() {
        axios.get('/api/users') // 스프링 부트 API 엔드포인트
            .then(response => {
                this.setState({ userData: response.data });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div className="App">
                <h1>React and Spring Boot Axios Test</h1>
                <p>{this.state.userData}</p>
            </div>
        );
    }
}

export default App;
