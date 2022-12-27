import { Header } from "./Header";
import Grid from '@mui/material/Unstable_Grid2';
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import Filters from "./Filter";
import "./css/Products.css"



export const Products=(props)=>{
    
    return (
    <>
        <Header products={true} cart={false} No_items={props.No_items} />
        <Grid container>
            <Grid item xs={2} md={3} style={{display:"fixed",}}>
                
                    <Filters 
                    filter_changes={props.filter_changes} 
                    filters={props.filters}
                    setFilters={props.setFilters}
                    checkbox={props.checkbox}
                    setCheckbox={props.setCheckbox}/> 
        
            </Grid>
            
            <Grid item xs={10} md={9}>
                
                    <SearchBar handle_search = {props.handle_search}/>
                    <Grid container spacing={5} key={"cards"}>
                        
                        {props.products.map((product) => {
                            if(product.display){
                            return (
                                
                            <Grid item xs={12} md={6} lg={3} display="flex" justifyContent="center" alignItems="center" key={product.id} >
                                
                                    <ProductCard 
                                    product={product} 
                                    add_to_cart={props.add_to_cart} 
                                    remove_from_cart={props.remove_from_cart}
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