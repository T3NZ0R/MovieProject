import React from 'react';

import vectorAboutUs from '../../img/VectorAboutUs.png';
import iconPeopleAboutUs from '../../img/iconPeopleAboutUs.png';
import pcAboutUs from '../../img/PCAboutUs.png';
import worldAboutUs from '../../img/worldAboutUs.png';

import './AboutUs.style.css'

const AboutUs = () => {
    return (
        <div className={"aboutUsWrap"}>

            <div className="aboutUsItem">

                <div className="arrowImgAboutUs">
                    <img src={vectorAboutUs} alt=""/>
                </div>
                <div className="textInfoAboutUsWrap">
                    <p className="topTextAboutUs">More Than</p>
                    <h1 className="mainTextAboutUs">200 millions</h1>
                    <p className="bottomTextAboutUs">viewers</p>
                    <img className="iconAboutUs" src={iconPeopleAboutUs} alt=""/>
                </div>

            </div>

            <div className="aboutUsItem">
                <div className="arrowImgAboutUs">
                    <img src={vectorAboutUs} alt=""/>
                </div>

                <div className="textInfoAboutUsWrap">

                    <p className="topTextAboutUs">
                        Average
                    </p>
                    <h1 className="mainTextAboutUs">
                        35 thousand
                    </h1>
                    <p className="bottomTextAboutUs">
                        users online per day
                    </p>
                    <img className="iconAboutUs" src={pcAboutUs} alt=""/>
                </div>

            </div>

            <div className="aboutUsItem">
                <div className="arrowImgAboutUs">
                    <img src={vectorAboutUs} alt=""/>
                </div>

                <div className="textInfoAboutUsWrap">
                    <p className="topTextAboutUs">
                        Users from
                    </p>
                    <h1 className="mainTextAboutUs">
                        88 countries
                    </h1>

                    <img className="iconAboutUs" src={worldAboutUs} alt=""/>

                </div>

            </div>


        </div>
    );
};

export {AboutUs};
