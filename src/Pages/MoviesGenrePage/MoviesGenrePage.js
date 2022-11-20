import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import {Dropdown, DropdownButton} from "react-bootstrap";

import {MovieInfo} from "../../Components";
import {moviesListService} from "../../Services/";
import {addPageNumber, addSort} from "../../Store";


const MoviesGenrePage = () => {

    const {genreId, page, sort} = useSelector(state => state['movieListReducer']);

    let [movies, setMovies] = useState([]);

    let {genre} = useParams();

    let currentGenre;

    if (genre === 'tv movie') {
        currentGenre = 'TV movie';
    } else {
        currentGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        moviesListService.getByGenre(genreId, page, sort).then(value => setMovies(value['results']));
        let releaseDateDesc = document.getElementById('releaseDateDesc');
        let releaseDateAsc = document.getElementById('releaseDateAsc');
        let rateDesc = document.getElementById('rateDesc');
        let rateAsc = document.getElementById('rateAsc');
        let noSort = document.getElementById('noSort');
        if (releaseDateAsc) {
            switch (sort) {
                case '&sort_by=primary_release_date.desc':
                    releaseDateDesc.style.color = '#219897';
                    releaseDateAsc.style.color = '#fff';
                    rateAsc.style.color = '#fff';
                    rateDesc.style.color = '#fff';
                    noSort.style.color = '#fff';
                    break;
                case '&sort_by=primary_release_date.asc':
                    releaseDateDesc.style.color = '#fff';
                    releaseDateAsc.style.color = '#219897';
                    rateAsc.style.color = '#fff';
                    rateDesc.style.color = '#fff';
                    noSort.style.color = '#fff';
                    break;
                case '&sort_by=vote_average.asc':
                    releaseDateDesc.style.color = '#fff';
                    releaseDateAsc.style.color = '#fff';
                    rateAsc.style.color = '#219897';
                    rateDesc.style.color = '#fff';
                    noSort.style.color = '#fff';
                    break;
                case '&sort_by=vote_average.desc':
                    releaseDateDesc.style.color = '#fff';
                    releaseDateAsc.style.color = '#fff';
                    rateAsc.style.color = '#fff';
                    rateDesc.style.color = '#219897';
                    noSort.style.color = '#fff';
                    break;
                case '&':
                    releaseDateDesc.style.color = '#fff';
                    releaseDateAsc.style.color = '#fff';
                    rateAsc.style.color = '#fff';
                    rateDesc.style.color = '#fff';
                    noSort.style.color = '#219897';
                    break;
                default:
            }
        }

    }, [genreId, page, sort]);


    return (
        <div>

            <div className={"currentType"}>
                {currentGenre}

                <DropdownButton className={'sortingGenre'} title="Sort by">
                    <Dropdown.Item id={"releaseDateDesc"}
                                   onClick={() => dispatch(addSort('&sort_by=primary_release_date.desc'))}>
                        Newest first</Dropdown.Item>
                    <Dropdown.Item id={"releaseDateAsc"}
                                   onClick={() => dispatch(addSort('&sort_by=primary_release_date.asc'))}>
                        Oldest first</Dropdown.Item>
                    <Dropdown.Item id={"rateAsc"}
                                   onClick={() => dispatch(addSort('&sort_by=vote_average.asc'))}>
                        Rate ascending</Dropdown.Item>
                    <Dropdown.Item id={"rateDesc"}
                                   onClick={() => dispatch(addSort('&sort_by=vote_average.desc'))}>
                        Rate descending</Dropdown.Item>
                    <Dropdown.Item id={"noSort"}
                                   onClick={() => dispatch(addSort('&'))}>
                        No sorting</Dropdown.Item>
                </DropdownButton>

            </div>

            <div className={'moviesList'}>
                {movies.map(value => <MovieInfo key={value.id} movie={value}/>)}
            </div>

            {page !== 1 ?
                <Pagination>
                    <Pagination.Prev onClick={() => dispatch(addPageNumber('prev'))}/>
                    <Pagination.Item onClick={() => dispatch(addPageNumber('prev'))}>{page - 1}</Pagination.Item>
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Item onClick={() => dispatch(addPageNumber('next'))}>{page + 1}</Pagination.Item>
                    <Pagination.Next onClick={() => dispatch(addPageNumber('next'))}/>
                </Pagination>
                :
                <Pagination>
                    <Pagination.Prev onClick={() => dispatch(addPageNumber('prev'))}/>
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Item onClick={() => dispatch(addPageNumber('next'))}>{page + 1}</Pagination.Item>
                    <Pagination.Item onClick={() => dispatch(addPageNumber('twoStep'))}>{page + 2}</Pagination.Item>
                    <Pagination.Next onClick={() => dispatch(addPageNumber('next'))}/>
                </Pagination>
            }

        </div>


    );
};

export {MoviesGenrePage};
