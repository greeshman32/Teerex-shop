import Box from "@mui/material/Box"; 
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Paper } from "@mui/material";
import "./css/Header.css";

export const Header=(props)=>{

    const navigation=useNavigate();
    
    const pageNavigation = (to_page) => {
        if(to_page==="products" && !props.products) navigation("/");
        else if(to_page==="cart" && !props.cart) navigation("/cart");
    }

    return (
        <div className="Header">
            <Box> 
                <h3>TeeRex Store</h3>  
            </Box>
 
            <Box className="icons">
                
                <span 
                onClick={()=>{ pageNavigation("products") }}
                elevation={3} 
                className={props.products ? "products bottom-border" : "products"}>
                    Products
                </span>
                
                <Paper 
                elevation={3} 
                className={props.cart ? "cart-icon bottom-border" : "cart-icon"} 
                onClick={()=>{ pageNavigation("cart") }}>
                    <ShoppingCartIcon />
                    {
                        props.cartItemsCount>0 && <span className="number">{props.cartItemsCount}</span>
                    }
                </Paper>
            </Box>
        </div>
    );

}

export default Header;