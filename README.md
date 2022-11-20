<h1 align="center"><img src="src/img/Group.png" alt="y" width="148"></h1> 

<h4 align="center"> "<a href="https://t3nz0r.github.io/movie-project/" style="text-decoration: underline">MovieHub</a>" is a ReactApp which will make choosing a movie for the evening much easier.</h4>  

## Used packages

### `axios`: `^0.27.2`

Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic.\
On the server-side it uses the native node.js http module, while on the client it uses XMLHttpRequests.

### `gh-pages`: `^4.0.0`

Publish files to a gh-pages branch on GitHub (or any other branch anywhere else).

### `joi`: `^17.7.0`

The most powerful schema description language and data validator for JavaScript.

### `react`: `^18.2.0`

React is a JavaScript library for building user interfaces.

### `react-bootstrap`: `^2.4.0`

Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development.\
It contains HTML, CSS and JavaScript-based design templates for typography, forms, buttons, navigation, and other
interface components.

### `react-click-outside-hook`: `^1.1.1`

React Hook implementation with click outside functionality.

### `react-dom`: `^18.2.0`

This package serves as the entry point to the DOM and server renderers for React.\
It is intended to be paired with the generic React package, which is shipped as react to npm.

### `react-hook-form`: `^7.33.1`

Performant, flexible and extensible forms with easy-to-use validation.

### `@reduxjs/toolkit`: `^1.8.3`

The official, opinionated, batteries-included toolset for efficient Redux development

### `react-router-dom`: `^6.3.0`

The react-router-dom package contains bindings for using React Router in web applications.

### `react-scripts`: `5.0.1`

This package includes scripts and configuration used by Create React App.

### `react-simple-star-rating`: `^4.0.5`

A simple react component for adding a star rating to your project.

## Used API

<h1 align="center"><img src="src/img/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.png" alt=""></h1>

TMDb offers a powerful API service that is free to use as long as you properly attribute us as the source of the data
and/or images you use. \
<a href="https://developers.themoviedb.org/3/getting-started/introduction">Link to the API documentation</a> 

Base URL: https://api.themoviedb.org/3/ \
Base URL for images: https://image.tmdb.org/t/p/original\

For this project we use:

| Path                               |     Page      |     Component     |
|:-----------------------------------|:-------------:|:-----------------:|
| `movie/now_playing`                | MovieListPage |    NowPlaying     |
| `movie/popular`                    | MovieListPage |      Popular      |          
| `movie/top_rated`                  | MovieListPage |     TopRated      |          
| `movie/upcoming`                   | MovieListPage |     Upcoming      |          
| `genre/movie/list`                 | ------------  |    GenreBadge     |          
| `discover/movie`                   | GenreListPage | ----------------- |          
| `search/movie`                     | ------------  |    SearchForm     |          
| `movie/`                           |  WatchMovie   |    MovieBadge     |          
| `authentication/guest_session/new` | ------------  |      Header       |          
| `/videos`                          |  WatchMovie   |   ------------    |          
| `/similar`                         |  WatchMovie   |   SimilarMovies   |          
| `/reviews`                         |  WatchMovie   |      Reviews      |          
