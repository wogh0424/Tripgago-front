import HeadBar from './Navbar';
import changeLanguageFunction from './translation';
import React, {Component, useEffect, useState, useRef} from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './restaurant-list.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './css/inputbar.css'
import {useTranslation} from "react-i18next";
import axios from "axios";
import './css/GetnaverAPI.css'

function SearchBar({ value, onChangeValue, onSearch, handleSubmit, dropdownValue, setDropdownValue, setData }) {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState('');
    const handleDropdownValue = (value) => {
        const parts = value.split("&")
        const order = parts[0]
        const visualValue = parts[1]
        setSelectedOption(visualValue)
        setDropdownValue(order)
    }
    useEffect(() => {
        changeLanguageFunction();
    }, []);
    useEffect(() => {
        setSelectedOption(t('header.standard'))
    }, [t])
    return (
            <form onSubmit={onSearch} className={"form-class"}>
                <InputGroup id="inputbar">
                    <DropdownButton variant="outline-secondary" title={selectedOption} id="input-group-dropdown-1">
                        <Dropdown.Item  onClick={() => handleDropdownValue('sim&정확도순')} href="#">{t('header.Accuracy')}</Dropdown.Item>
                        <Dropdown.Item  onClick={() => handleDropdownValue('date&날짜순')} href="#">{t('header.date')}</Dropdown.Item>

                    </DropdownButton>
                    <Form.Control
                        value={value}
                        onChange={(e) => onChangeValue(e.target.value)}
                    />
                </InputGroup>
                <Button variant="info" className="m-4" onClick={onSearch}>{t('header.searchbtn')}</Button>
            </form>
    );
}


function GetNaverAPI ( { value,inputValue, isFetching, setIsFetching, dropdownValue, setData, data } ) {
    const { t } = useTranslation();
    const [page, setPage] = useState(1)
    useEffect(() => {
        changeLanguageFunction();
    }, []);
    const [display] = useState(20)
    const FetchData = async () => {
        const params = new URLSearchParams({
            order: dropdownValue,
            inputValue: inputValue,
            start: page
        });

        const res = await fetch(`/api/getNaverAPI/${params.toString()}`)
        if (!res.ok) {
            throw new Error("No response from server")
        }
        const newData = await res.json()
        setData(prevData => [...prevData, ...newData]); // 새 데이터 추가
        setIsFetching(false);
    }

    const handlerScroll = () => {
        const ob = {
            scrollTop: document.documentElement.scrollTop,
            clientHeight: window.innerHeight,
            scrollHeight: document.documentElement.offsetHeight
        };
        const a = Math.round((ob.scrollTop + ob.clientHeight + 0.5) / 2)
        const b = Math.round((ob.scrollHeight / 2))
        console.log(a)
        console.log(b)
        const flag = a >= b
        console.log(flag)
        if (a >= b) {
            if(!isFetching){
                setIsFetching(true)
                setPage(prevPage => prevPage + 1);
        }}
    };

    useEffect(() => {
        window.addEventListener('scroll', handlerScroll);
        return () => window.removeEventListener('scroll', handlerScroll);
    }, [handlerScroll, isFetching]);

    useEffect(() => {
        if (isFetching) FetchData();
    }, [display, isFetching]);
    const formatDate = (date) => {
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        return `${year}년${month}월${day}일`;
    }
    return (
    <div className={"row-frame"}>
        <div className="row">
            {data && data.map((item, index) => (
                <Card key={index} id={"card-size"} className="col-6 col-sm-6 col-md-2 me-4 mt-3">
                    <Card.Body>
                        <Card.Title>
                            <span>{item.title.replace(/<b>|<\/b>/g, '')}</span>
                        </Card.Title>
                        <Card.Text>
                            <span>{item.description.replace(/&[a-z]+;|#<b>.*?<\/b>|<b>.*?<\/b>|#\w+/g, '')}</span>
                        </Card.Text>
                        <p id={"date"}>
                            <span>게시일 : {formatDate(item.postdate)}</span>
                        </p>
                        <a href={item.link} target={"_blank"}>
                            <Button variant="primary">
                                <span>{t('header.moveblog')}</span>
                            </Button>
                        </a>
                    </Card.Body>
                </Card>
            ))}
        </div>

    </div>
    )
}

const queryClient = new QueryClient();
function App() {
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('서울맛집')
    const [isFetching, setIsFetching] = useState(false)
    const [dropdownValue, setDropdownValue] = useState('sim')
    useEffect((inputValue) => {
        setIsFetching(true);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setData([]);
        setIsFetching(true); // 검색 시작
    };

    return (
        <QueryClientProvider client={queryClient} >
            <SearchBar value={inputValue} onChangeValue={setInputValue} onSearch={handleSearch} dropdownValue={dropdownValue} setDropdownValue={setDropdownValue}/>
            <GetNaverAPI inputValue={inputValue} isFetching={isFetching} setIsFetching={setIsFetching} setData={setData} data={data} dropdownValue={dropdownValue} />
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
