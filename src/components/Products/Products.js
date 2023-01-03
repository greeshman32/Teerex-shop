import { Header } from "../Header";
import Grid from '@mui/material/Unstable_Grid2';
import SearchBar from "../Search/SearchBar";
import ProductCard from "./ProductCard";
import Filters from "../Filter/Filter";
import "./Products.css"



export const Products=(props)=>{
    
    return (
    <>
        <Header products={true} cart={false} cartItemsCount={props.cartItemsCount} />
        <Grid container>
            <Grid item xs={2} md={3} style={{display:"fixed",}}>
                
                    <Filters 
                    filterProducts={props.filterProducts} 
                    filters={props.filters}
                    setFilters={props.setFilters}
                    checkbox={props.checkbox}
                    setCheckbox={props.setCheckbox}/> 
        
            </Grid>
            
            <Grid item xs={10} md={9}>
                
                    <SearchBar handleSearch = {props.handleSearch}/>
                    <Grid container spacing={5} key={"cards"}>
                        
                        {props.products.map((product) => {
                            if(product.display){
                            return (
                                
                            <Grid item xs={12} md={6} lg={3} display="flex" justifyContent="center" alignItems="center" key={product.id} >
                                
                                    <ProductCard 
                                    product={product} 
                                    addToCart={props.addToCart} 
                                    removeFromCart={props.removeFromCart}
                                />
                                
                            </Grid>
                            );}
                            else return <></>;
                        })}
                        
                    </Grid> 
                
            </Grid>
        </Grid>
        
    </>
    );
}    



export default Products;