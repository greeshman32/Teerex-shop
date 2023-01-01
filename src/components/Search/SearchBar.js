import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./css/SearchBar.css"
import { useState } from "react";

export const SearchBar = (props) => {

    const [ search_terms, setSearch_Value ]=useState('');

    const handle_change = (e) => {
        setSearch_Value(e.target.value);
    }


    return (
        <div className="search_bar">
            <TextField 
            id="search_bar" 
            placeholder="Search for Products..." 
            fullWidth
            onChange={handle_change}
            variant="standard" />
            <button className="search button" onClick={()=>props.handleSearch(search_terms)}><SearchIcon/></button>
        </div>
    );
}

export default SearchBar;