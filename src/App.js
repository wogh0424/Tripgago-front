// App.js
import React, {Component, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import HeadBar from "./Navbar";
import Maincontents from "./Main-content";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';



const queryClient = new QueryClient();

function Apps() {
    return (
        <QueryClientProvider client={queryClient}>
        <FetchDataComponent />
        </QueryClientProvider>
    )
}


function FetchDataComponent() {
    const { data, error, isLoading } = useQuery('fetchData', async () => {
        const response = await fetch('/api/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {data}
        </div>
    );
}
function IsExpanded() {
    const [navExpanded, setNavExpanded] = useState(false);

    const toggleNavbar = () => {
        setNavExpanded(!navExpanded)
    };
    return (
        <>
        <HeadBar />
            <Maincontents />
        </>
    )
}


class App extends Component {

    render() {
        return(
            <div>
                <IsExpanded />
                <Apps />
            </div>
        )
    }
}

export default App;
