import { Chip } from '@mui/material';
import axios from 'axios'
import React, { useEffect } from 'react'

const Genres = ({ type, selectedGenres, genres, setGenres, setSelectedGenres, setpage }) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setpage(1);
        // console.log(selectedGenres);
        // console.log(genre);
    }
    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setpage(1);
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        console.log(data)
        setGenres(data.genres);
    }

    //console.log(genres);
    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({});
        }
    }, [])

    return (
        <div style={{ padding: "6px 0" }}>
            {
                selectedGenres && selectedGenres.map((genre) => (

                    <Chip
                        label={genre.name}
                        style={{ margin: 2 }}
                        clickable
                        size='small'
                        color="primary"
                        key={genre.id}
                        onDelete={() => handleRemove(genre)}
                    />
                ))
            }
            {
                genres && genres.map((genre) => (
                    <Chip
                        label={genre.name}
                        style={{ margin: 2, background: "white" }}
                        clickable
                        size='small'
                        key={genre.id}

                        onClick={() => handleAdd(genre)}
                    />
                ))
            }
        </div>
    )
}

export default Genres