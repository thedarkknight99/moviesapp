import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieContent from '../../components/moviescontent/MovieContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import "./Trending.css";


const Trending = () => {
    const [page, setpage] = useState(1)
    const [content, setcontent] = useState([])
    const getTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setcontent(data.results);
        //console.log(data)
    }
    useEffect(() => {
        getTrending()
    }, [page])


    return (
        <div>
            <span className='pageTitle'>Trending</span>
            <div className='trending'>
                {
                    content && content.map((c) =>
                        <MovieContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.name || c.title}
                            date={c.release_date || c.first_air_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    )
                }
            </div>
            <CustomPagination setPage={setpage} />
        </div>
    )
}

export default Trending


//https://docs.google.com/document/d/1wlUmidb-70Y0SfU4u3ORdMablHhtL1QN_-aJ292o7gU/edit#
//https://github.com/piyush-eon/react-entertainment-hub
//https://www.resume.com/sample/front-end-developer-resume-sample