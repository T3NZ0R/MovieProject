import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {DropdownButton, Dropdown} from 'react-bootstrap'

import {addGenreId, getAllGenres} from "../../Store/";
import './GenreBadge.style.css';

const GenreBadge = () => {

    const {genres} = useSelector(state => state['genreReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGenres())
    }, [dispatch, genres]);


    return (
        <>
            <DropdownButton className={'genre'} id={'genre'} title="Genre">
                {genres.map(value =>
                    <Dropdown.Item key={value.id} onClick={() => dispatch(addGenreId(value.id))}>
                        <NavLink to={`movie-project/genre/${value.name.toLowerCase()}`}>{value.name}</NavLink></Dropdown.Item>
                )}
            </DropdownButton>
        </>
    );
};

export {GenreBadge};
