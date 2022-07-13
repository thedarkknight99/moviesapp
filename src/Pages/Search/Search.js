import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import MovieContent from '../../components/moviescontent/MovieContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {
    const [type, setType] = useState([]);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [numOfPages, setnumOfPages] = useState();

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        }
    })

    const fetchSearch = async () => {
        try {
            const data = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}
                        &language=en-US&query=${searchText}&page=${page}&include_adult=false`);
            setContent(data.results);
            setnumOfPages(data.total_pages);
        }
        catch (err) {
            console.log(err);
        }

    };
    useEffect(() => {
        //fetchSearch();
    }, [type, page])

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <span className='pageTitle'>Search</span>
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="search"
                        variant='filled'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        style={{ marginLeft: 10 }}
                        onClick={fetchSearch}>
                        <SearchIcon />
                    </Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor='primary'
                    onChange={(event, newvalue) => {
                        setType(newvalue);
                        setPage(1);
                    }}
                    style={{ paddingBottom: "5px" }}
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab sstyle={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>

            <div className='trending'>
                {
                    content && content.map((c) =>
                        <MovieContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.name || c.title}
                            date={c.release_date || c.first_air_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    )
                }
                {
                    searchText &&
                    !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
                }

            </div>
            {
                numOfPages > 1 && (
                    <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                )
            }
        </div >
    )
}

export default Search