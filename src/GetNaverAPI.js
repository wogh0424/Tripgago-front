import HeadBar from './Navbar';
import React, {Component, useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './restaurant-list.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './css/inputbar.css'

function SearchBar({ value, onChangeValue, onSearch, handleSubmit, dropdownValue, setDropdownValue }) {
    const [selectedOption, setSelectedOption] = useState('검색기준')
    const handleDropdownValue = (value) => {
        const parts = value.split("&")
        const order = parts[0]
        const visualValue = parts[1]
        setSelectedOption(visualValue)
        setDropdownValue(order)
    }
    return (
            <form onSubmit={onSearch} className={"form-class"}>
                <InputGroup id="inputbar">
                    <DropdownButton variant="outline-secondary" title={selectedOption} id="input-group-dropdown-1">
                        <Dropdown.Item  onClick={() => handleDropdownValue('sim&정확도순')} href="#">정확도순</Dropdown.Item>
                        <Dropdown.Item  onClick={() => handleDropdownValue('date&날짜순')} href="#">날짜순</Dropdown.Item>

                    </DropdownButton>
                    <Form.Control
                        value={value}
                        onChange={(e) => onChangeValue(e.target.value)}
                    />
                </InputGroup>
                <Button variant="info" className="m-4" onClick={onSearch}>검색</Button>
            </form>
    );
}

function GetNaverAPI ( { value,inputValue, isFetching, setIsFetching, dropdownValue } ) {
    const params = new URLSearchParams({
        order: dropdownValue,
        inputValue: inputValue
    })
    const { data, error, isLoading } = useQuery('fecthData', async () => {
        const res = await fetch(`api/getNaverAPI/${params.toString()}`)
        setIsFetching(false)
        if(!res.ok) {
            throw new Error('No Response from server')
        }
        return res.json();
    }, {
        enabled: isFetching
    })
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error : {error.message} </div>
    const formatDate = (date) => {
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        return `${year}년${month}월${day}일`;
    }
    return (
    <div className={"row-frame"}>
        <div className="row">
            {data && data.map((item,index) => (
                <Card key={index} id={"card-size"} className="col-6 col-sm-6 col-md-2 me-4 mt-3">
                    <Card.Body>
                        <Card.Title>{item.title.replace(/<b>|<\/b>/g, '')}</Card.Title>
                        <Card.Text>
                            {item.description.replace(/&[a-z]+;|#<b>.*?<\/b>|<b>.*?<\/b>|#\w+/g, '')}
                        </Card.Text>
                        <p id={"date"}>게시일 : {formatDate(item.postdate)}</p>
                        <a href={item.link}><Button variant="primary">블로그로 이동</Button></a>
                    </Card.Body>
                </Card>
            ))}
        </div>
    </div>
    )
}

const queryClient = new QueryClient();
function App() {
    const [inputValue, setInputValue] = useState('서울맛집')
    const [isFetching, setIsFetching] = useState(false)
    const [dropdownValue, setDropdownValue] = useState('sim')
    const [value, setValue] = useState('')
    const handleSearch = (e) => {
        e.preventDefault()
        setIsFetching(true)
    };

    useEffect(() => {
        setIsFetching(true);
    }, []);
    return (
        <QueryClientProvider client={queryClient} >
            <SearchBar value={inputValue} onChangeValue={setInputValue} onSearch={handleSearch} dropdownValue={dropdownValue} setDropdownValue={setDropdownValue}/>
            <GetNaverAPI inputValue={inputValue} isFetching={isFetching} setIsFetching={setIsFetching} dropdownValue={dropdownValue}/>
        </QueryClientProvider>
    )
}


class GetNaverAPIs extends Component {
    render() {
        return(
            <div>
                <App />
            </div>
        )
    }
}


export default GetNaverAPIs;
