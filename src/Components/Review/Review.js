import React from 'react';

import {baseURLImg} from "../../Constants";

import './Review.style.css';
import defaultAvatar from '../../img/profile.png';


const Review = ({review}) => {

    const {content, author_details} = review;
    const {username, avatar_path,} = author_details;

    let avatar;

    if (avatar_path != null) {
        if (avatar_path.includes('gravatar')) {
            avatar = avatar_path.substring(1);
        } else {
            avatar = baseURLImg + avatar_path;
        }
    } else {
        avatar = defaultAvatar;
    }

    return (
        <div className={"reviewWrap"}>

            <div className={"reviewTopWrap"}>
                <img src={avatar} alt=""/>
                <h2>{username}</h2>
            </div>

            <p className={"reviewContent"}>{content}</p>

        </div>
    );
};

export {Review};
