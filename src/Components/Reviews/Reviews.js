import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {joiResolver} from "@hookform/resolvers/joi";

import {addReview} from "../../Store";
import {Review} from "../Review/Review";
import {ReviewValidator} from "../../Validators/review.validator";

import './Reviews.style.css';
import close from '../../img/close.png';

const Reviews = ({movieId}) => {

    const {reviewFromAPI, reviewFromFront} = useSelector(state => state['movieListReducer']);

    let review = [];
    let reviewTemp = [];

    for (let i = 0; i < reviewFromAPI.length; i++) {
        review[i] = reviewFromAPI[i];
    }

    for (let i = 0; i < reviewFromFront.length; i++) {
        if (reviewFromFront[i].movieId === movieId) {
            reviewTemp[reviewTemp.length] = reviewFromFront[i];
        }
    }

    review = reviewTemp.concat(review);

    let leaveReview = document.getElementById('leaveReview');
    let body = document.getElementById('body');

    const {handleSubmit, register, reset, formState: {errors}} = useForm({resolver: joiResolver(ReviewValidator),
    mode:"onTouched"});
    const dispatch = useDispatch();

    const submit = (data) => {
        data.movieId = movieId;
        if (data.username !== '') {
            dispatch(addReview(data));
            leaveReview.classList.add('hideReview');
            body.classList.remove('stopScroll');
        }
        reset();
    }


    return (
        <div className={"reviewsFullWrap"}>
            <div className={"reviewsTopWrap"}>
                <h1 className={"reviewTitle"} id={'reviews'}>Reviews</h1>
                <button className={"reviewButton"}
                        onClick={() => {
                            leaveReview.classList.remove('hideReview');
                            body.classList.add('stopScroll');
                        }}
                ><a href={'#reviews'}>
                    Leave my review
                </a>
                </button>
            </div>

            <div className={"blurBackground  hideReview"}
                 id={"leaveReview"}>
                <div className="leaveReviewWrap ">

                    <form onSubmit={handleSubmit(submit)}>

                        <div className="leaveReviewTop">

                            <h1>Review </h1>
                            <button onClick={() => {
                                leaveReview.classList.add('hideReview');
                                body.classList.remove('stopScroll');
                            }}><img src={close} alt="close"/></button>

                        </div>

                        <div className="leaveReviewInput">
                            <div className={"reviewInputWrap"}>
                                <input className="reviewInput" placeholder="Name" {...register('username')}/>
                                {errors.username && <div className={"validationMessage"}>{errors.username.message}</div> }
                            </div>
                            <div className={"reviewInputWrap"}>
                                <input className="reviewInput" placeholder="E-mail" {...register('email')}/>
                                {errors.email && <div className={"validationMessage"}>{errors.email.message}</div> }
                            </div>

                        </div>

                        <div className="leaveReviewTextArea">

                            <textarea className="content" {...register('content')}></textarea>
                            {errors.content && <div className={"validationMessage topSpace"}>{errors.content.message}</div> }
                        </div>

                        <div className="leaveReviewButtonWrap">

                            <button className="buttonLeaveReview buttonText">Leave my review
                            </button>

                        </div>

                    </form>

                </div>
            </div>


            {review.length !== 0 ?
                <div className={"reviewsWrap"}>
                    {review.map(value => <Review key={value.id} review={value}/>)}
                </div>
                :
                <div className={"emptyReviews"}>
                    Reviews is empty. You may be the first.
                </div>
            }

        </div>
    );
};

export
{
    Reviews
}
    ;
