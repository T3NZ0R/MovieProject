import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {useClickOutside} from 'react-click-outside-hook';

import {addMovieId, searchMovie} from "../../Store";
import './searchForm.style.css';
import searchIcon from '../../img/Vector.png'


const SearchForm = () => {

    const {searchMovies} = useSelector(state => state['movieListReducer']);

    let dropdownItems = searchMovies.slice(0, 10);

    const {register, handleSubmit, reset} = useForm();

    const dispatch = useDispatch();

    const submit = (data) => {
        if (data.movie) {
            dispatch(searchMovie(data.movie));
            reset();
        }
    };

    const [ref, isClickedOutside] = useClickOutside();

    useEffect(() => {
        let dropdownItems = document.getElementsByClassName("dropdownItems");
        dropdownItems = dropdownItems[0];

        if (isClickedOutside) {
            dropdownItems.classList.add('hide');
        }

        if (!isClickedOutside){
            dropdownItems.classList.remove('hide');
        }

    }, [isClickedOutside]);

    return (
        <div>
            <div className="search-container" ref={ref}>
                <div className="search-inner">
                    <form onSubmit={handleSubmit(submit)}>
                        <input type="text" placeholder={'Search...'} {...register('movie')} />
                        <button className={'button'}><img className={'iconSearch'}
                                                          src={searchIcon}
                                                          alt={'searchIcon'}/></button>
                    </form>
                </div>
                <div className="dropdownItems dropdown" id={'dropdownItems'}>
                    {
                        dropdownItems.map(item =>
                            <div
                                key={item['id']} className={"dropdownItemWrap"}
                            ><NavLink className="dropdownItem" to={`/movie-project/movie/${item.id}`}
                                      onClick={() => {dispatch(addMovieId(item.id))
                                          window.scrollTo(0, 0)}
                            }>{item['title']}</NavLink>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export {SearchForm};
