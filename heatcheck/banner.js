import React, { useState, useEffect } from 'react';
import './App.css';
import desktopImage from './';
import mobileImage from './pineapple-mobile.jpg';

const App = () => {
    const [windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const imageUrl = windowWidth >= 650 ? desktopImage : mobileImage;

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    });
    
    return (
        <div className="App" style={{backgroundImage: `url(${imageUrl})` }}>
            <div className="App-content">
                <h1>Heat Check</h1>
                <p>It's what's hot right now!</p>
            </div>
        </div>
    );

};

export default App;