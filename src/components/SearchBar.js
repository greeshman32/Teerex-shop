import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import "./css/SearchBar.css"

export const SearchBar = (props) => {
    return (
        <div className="search_bar">
            <TextField 
            id="search_bar" 
            placeholder="Search for Products..." 
            fullWidth
            variant="standard" />
            <Button onClick={props.handle_search}><SearchIcon/></Button>
        </div>
    );
}

export default SearchBar;