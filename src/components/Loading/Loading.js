import React from 'react';
import './Loading.css';
import sun from './sun.png';

const Loading = () => {
return (
    <div className="loading">
    <img className="sun" alt="sun" src={sun} />     
    </div>
);
}

export default Loading;