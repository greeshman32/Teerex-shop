import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./css/SearchBar.css"

export const SearchBar = (props) => {

    let search_terms='';

    const handle_change = (e) => {
        search_terms=e.target.value;
        console.log(search_terms);
    }


    return (
        <div className="search_bar">
            <TextField 
            id="search_bar" 
            placeholder="Search for Products..." 
            fullWidth
            onChange={handle_change}
            variant="standard" />
            <button className="search button" onClick={props.handle_search(search_terms)}><SearchIcon/></button>
        </div>
    );
}

export default SearchBar;