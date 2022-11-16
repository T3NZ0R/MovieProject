import React from 'react';

import './footer.style.css';

import telegram from '../../img/Telegram_logo 2.png';
import instagram from '../../img/pngegg (1) 2.png';
import facebook from '../../img/pngwing 2.png';
import linkedin from '../../img/material__9.png';

const Footer = () => {
    return (
        <div className={"footerBackground"}>
            <div className={"footerInfoWrap"}>
                <div className="support">
                    <p className="supportStyle"> Support:</p>
                    <p className="gmailStyle"> moviehubsupport@gmail.com:</p>
                    <p className="allRight"> All right reserved 2022</p>

                </div>

                <div className="contacts">
                    <p className="contactStyle"> Contact us:</p>
                    <p className="numberStyle"> moviehub@gmail.com</p>
                    <p className="numberStyle">+38(97)-777-77-77</p>
                    <p className="numberStyle"> +38(63)-666-66-66</p>

                </div>

                <div className="socialMedia">
                    <p className="textSocial"> Our social media:</p>
                    <div className="photoMedia">
                        <img className="telegram" src={telegram} alt="telegram"/>
                        <img className="instagram" src={instagram} alt="instagram"/>
                        <img className="facebook" src={facebook} alt="facebook"/>
                        <img className="linkedin" src={linkedin} alt="linkedin"/>
                    </div>
                </div>

                <div className="address">

                    <p className="textAddress"> Address:</p>
                    <p className="addressFaq"> 07734 Lviv, Rynok square, 7</p>
                    <p className="textFaq"> FAQ:</p>
                    <p className="addressFaq"> www.moviefaq.com</p>

                </div>

            </div>

        </div>
    );
};

export {Footer};
