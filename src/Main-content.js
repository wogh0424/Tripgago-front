import React, {Component, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Caroucel.css'
import image1 from './사진/3820145201700009k_Skyscraper.jpg';
import image2 from './사진/3820147201900031k_Passionate Night in Busan.jpg';
import image3 from './사진/3820147201900026k_Amazing View in Seorak.jpg';
import image4 from './사진/3820147201900026k_Amazing View in Seorak.jpg';
import IsExpanded from './App'

function Maincontents() {
    return (
        <Carousel>
            <Carousel.Item interval={1000}>
                <img
                    style={{ height: '90vh', width:'100%' }}
                    src={image1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    style={{ height: '90vh', width:'100%' }}
                    src={image2}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{ height: '90vh', width:'100%' }}
                    src={image3}
                    alt="First slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default Maincontents