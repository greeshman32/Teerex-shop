import Box from "@mui/material/Box"; 
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Paper } from "@mui/material";
import "./css/Header.css";

export const Header=(props)=>{

    const navigation=useNavigate();
    
    const page_nav = (to_page) => {
        if(to_page==="products" && !props.products) navigation("/");
        else if(to_page==="cart" && !props.cart) navigation("/cart");
    }

    return (
        <Box className="Header">
            <Box> 
                <h3>TeeRex Store</h3>  
            </Box>
 
            <Box className="icons">
                
                <span 
                onClick={()=>{ page_nav("products") }}
                elevation={3} 
                className={props.products ? "products bottom-border" : "products"}>
                    Products
                </span>
                
                <Paper 
                elevation={3} 
                className={props.cart ? "cart bottom-border" : "cart"} 
                onClick={()=>{ page_nav("cart") }}>
                    <ShoppingCartIcon />
                    {
                        props.No_items>0 && <span className="number">{props.No_items}</span>
                    }
                </Paper>
            </Box>
        </Box>
    );

}

export default Header;