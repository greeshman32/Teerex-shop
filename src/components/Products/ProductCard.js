import Card from "@mui/material/Card"
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./ProductCard.css"

export const ProductCard = (props) => {
    const { product }=  props;
    
    return(
    <>
    <Card sx={{ width: 400 }} >
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
                    <button className="add button" onClick={()=>props.addToCart(product.id)}>ADD TO CART</button> : (
                    <> 
                    <button className="add button" onClick={()=>props.addToCart(product.id)}>+</button> 
                    {product.cart} 
                    <button className="remove button" onClick={()=>props.removeFromCart(product.id)}>-</button> 
                    </>
                    )
                }
        </div>
    </Card>
    </>
    );
}



export default ProductCard;