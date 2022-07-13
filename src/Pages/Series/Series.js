import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Genres from '../../components/Genres'
import MovieContent from '../../components/moviescontent/MovieContent'
import CustomPagination from '../../components/Pagination/CustomPagination';
import useGenres from '../../hooks/useGenres';

const Series = () => {
    const [page, setpage] = useState(1);
    const [content, setcontent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`
        );
        setcontent(data.results);
        setnumOfPages(data.total_pages);
        // console.log(data);
    }
    useEffect(() => {
        fetchMovies();
    }, [page, genreforURL])
    return (
        <div>
            <span className='pageTitle'>TV Series</span>
            <Genres
                type='tv'
                selectedGenres={selectedGenres}
                genres={genres}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                setpage={setpage}
            />
            <div className='trending'>
                {
                    content && content.map((c) =>
                        <MovieContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.name || c.title}
                            date={c.release_date || c.first_air_date}
                            media_type="tv"
                            vote_average={c.vote_average}
                        />
                    )
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setpage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default Series