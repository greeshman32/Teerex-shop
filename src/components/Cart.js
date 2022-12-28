import Header from "./Header"
import "./css/CartPage.css"


export const Cart=(props)=>{
    
    
     
    return<>
    
    <Header products={false} cart={true} cartItemsCount={props.cartItemsCount}/>
    {props.totalCost===0 && <h1 className="e-cart">Empty Cart</h1>}
    <div className="cart">
        {
            props.products.map(product=>{
                if(product.cart){
                    return (
                        <div className="content " key={product.id}>
                            <div className = "image">
                                <img src = { product.imageURL } width={100} alt = "product_image" loading="lazy" />
                                
                            </div>

                            <div className="product-details">
                                <h2>{product.name}</h2>
                                Rs.{product.price*product.cart}
                            </div>
                            
                            <div className="cart-details">
                                <div className="no_items">
                                    <button className="bt" onClick={()=>props.addToCart(product.id)}>+</button>
                                    {product.cart}
                                    <button className="bt" onClick={()=>props.removeFromCart(product.id)}>-</button>
                                </div>
                                <button 
                                className="delete-button" 
                                onClick={()=>{props.manipulateCart(product.id, -product.cart)}}> 
                                    Delete
                                </button>
                            </div>
                        </div>
                    );  
                }
                return <></>
            }) 

        }

        {props.totalCost>0 && <div className="total"><h1>Total amount:</h1><div className="total-price">Rs.{props.totalCost}</div></div>}
    </div>

    </>;
}


export default Cart;