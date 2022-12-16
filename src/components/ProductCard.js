import Card from "@mui/material/Card"
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./css/ProductCard.css"

export const ProductCard = (props) => {
    const { product }=  props;


    // const button_logic=()=>{
           
    //     return (
    //         <>
    //             { !props.product.cart ?
    //                 <button className="add button" onClick={()=>props.add_to_cart(product.id)}>ADD TO CART</button> : (
    //                 <> 
    //                 <button className="add button" onClick={()=>props.add_to_cart(product.id)}>+</button> 
    //                 {product.cart} 
    //                 <button className="remove button" onClick={()=>props.remove_from_cart(product.id)}>-</button> 
    //                 </>
    //                 )
    //             }
    //         </>
    //     );
    // }

    
    return(
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="240"
        image={product.imageURL}
        alt={product.name}
      />
      
        <Typography gutterBottom variant="h5" component="div" pl={3} pt={2} fontWeight={600}>
          {product.name}
        </Typography>
        <div className="details">
            <h3>₹{product.price}</h3>
            { (props.product.cart===0) ?
                    <button className="add button" onClick={()=>props.add_to_cart(product.id)}>ADD TO CART</button> : (
                    <> 
                    <button className="add button" onClick={()=>props.add_to_cart(product.id)}>+</button> 
                    {product.cart} 
                    <button className="remove button" onClick={()=>props.remove_from_cart(product.id)}>-</button> 
                    </>
                    )
                }
        </div>
    </Card>
    </>
    );
}



export default ProductCard;