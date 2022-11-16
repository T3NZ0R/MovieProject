import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Pagination from 'react-bootstrap/Pagination';

import {MovieInfo} from "../../Components";
import {moviesListService} from "../../Services";
import {addPageNumber} from "../../Store";
import './movieListPage.style.css';

const MoviesListPage = () => {

    const {moviesType, page, currentType} = useSelector(state => state['movieListReducer']);

    let [movies, setMovies] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        moviesListService.getMovieList(moviesType, page).then(value => setMovies(value['results']))
    }, [moviesType, page]);


    return (
        <div>
            <div className={"currentType"}>
                {currentType}
            </div>
            <div className={'moviesList'}>
                {movies.map(value => <MovieInfo key={value.id} movie={value}/>)}
            </div>
            {page !== 1 ?
                <Pagination >
                    <Pagination.Prev onClick={() => dispatch(addPageNumber('prev'))}/>
                    <Pagination.Item onClick={() => dispatch(addPageNumber('prev'))} >{page - 1}</Pagination.Item>
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Item onClick={() => dispatch(addPageNumber('next'))} >{page + 1}</Pagination.Item>
                    <Pagination.Next onClick={() => dispatch(addPageNumber('next'))}/>
                </Pagination>
                :
                <Pagination>
                    <Pagination.Prev onClick={() => dispatch(addPageNumber('prev'))}/>
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Item onClick={() => dispatch(addPageNumber('next'))} >{page + 1}</Pagination.Item>
                    <Pagination.Item onClick={() => dispatch(addPageNumber('twoStep'))} >{page + 2}</Pagination.Item>
                    <Pagination.Next onClick={() => dispatch(addPageNumber('next'))}/>
                </Pagination>
            }


        </div>
    );

};

export {MoviesListPage};



