import React from 'react';

import './NoInfo.style.css';
import zeroIcon from '../../img/Group 76.png';

const NoInfo = () => {
    return (
        <div className={"errorPage"}>

            <h1>4</h1>
            <img className={"zeroIcon"} src={zeroIcon} alt="zeroIcon"/>
            <h1>4</h1>
            <h2>Not Found</h2>
        </div>
    );
};

export {NoInfo};
