import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

// const useStyles = makeStyles({
//     root: {
//         position: "fixed",
//         bottom: 0,
//         backgroundColor: "#2d313a",
//         zIndex: 100
//     },
// });

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    //const history = unstable_HistoryRouter();
    const history = useNavigate();

    React.useEffect(() => {
        if (value === 0) history("/")
        else if (value === 1) history("/movies")
        else if (value === 2) history("/series")
        else if (value === 3) history("/search")
    }, [value, history])


    // const classes = useStyles();

    return (
        <Box
            sx={{
                width: "100%",
                color: "black",
                bottom: 0,
                position: "fixed",
                zIndex: 100
            }}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ backgroundColor: "#1a273c" }}
            >
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Trending"
                    icon={<WhatshotIcon />}
                />
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Movies"
                    icon={<MovieIcon />}
                />
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="TV Series"
                    icon={<TvIcon />}
                />
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Search"
                    icon={<SearchIcon />}
                />
            </BottomNavigation>
        </Box >
    );
}
