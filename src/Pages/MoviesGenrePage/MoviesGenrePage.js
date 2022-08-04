import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

import {MovieInfo} from "../../Components";
import {moviesListService} from "../../Services/";
import {addPageNumber} from "../../Store";

const MoviesGenrePage = () => {

    const {genreId, page} = useSelector(state => state['movieListReducer']);

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
        moviesListService.getByGenre(genreId, page).then(value => setMovies(value['results']))
    }, [genreId, page]);


    return (
        <div>

            <div className={"currentType"}>
                {currentGenre}
            </div>

            <div className={'moviesList'}>
                {movies.map(value => <MovieInfo key={value.id} movie={value}/>)}
            </div>

            {page !== 1 ?
                <Pagination>
                    <Pagination.Prev onClick={() => dispatch(addPageNumber('prev'))}/>
                    <Pagination.Item>{page - 1}</Pagination.Item>
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Item>{page + 1}</Pagination.Item>
                    <Pagination.Next onClick={() => dispatch(addPageNumber('next'))}/>
                </Pagination>
                :
                <Pagination>
                    <Pagination.Prev onClick={() => dispatch(addPageNumber('prev'))}/>
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Item>{page + 1}</Pagination.Item>
                    <Pagination.Item>{page + 2}</Pagination.Item>
                    <Pagination.Next onClick={() => dispatch(addPageNumber('next'))}/>
                </Pagination>
            }

        </div>


    );
};

export {MoviesGenrePage};
