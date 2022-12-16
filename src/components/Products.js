import { Header } from "./Header";
import Grid from "@mui/system/Unstable_Grid/Grid";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import Filters from "./Filter";
import Paper  from "@mui/material/Paper"
import "./css/Products.css"


export const Products=(props)=>{
    
    return (
    <>
        <Header products={true} cart={false} No_items={props.No_items} />
        <Grid container>
            <Grid item xs={12} md={4} style={{display:"fixed",}}>
                
                    <Filters/> 
        
            </Grid>
            
            <Grid item xs={12} md={8}>
                
                    <SearchBar handle_search={props.handle_search}/>
                    <Grid container spacing={5} >
                        
                        {props.products.map((product) => {
                            if(product.display){
                            return (
                                
                            <Grid item xs={12} md={6} lg={3} key={product.id}>
                                <Paper elevation={5}>
                                    <ProductCard 
                                    product={product} 
                                    add_to_cart={props.add_to_cart} 
                                    remove_from_cart={props.remove_from_cart}
                                />
                                </Paper>
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