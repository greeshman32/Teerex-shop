import Header from "./Header"
import "./css/CartPage.css"


export const Cart=(props)=>{
    
    
    
    return<>
    
    <Header products={false} cart={true} No_items={props.No_items}/>
    
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
                                Rs.{product.price}
                            </div>
                            
                            <div className="cart-details">
                                <div className="no_items">
                                    <button className="bt" onClick={()=>props.add_to_cart(product.id)}>+</button>
                                    {product.cart}
                                    <button className="bt" onClick={()=>props.remove_from_cart(product.id)}>-</button>
                                </div>
                                <button 
                                className="delete-button" 
                                onClick={()=>{props.manipulate_cart(product.id,-product.cart)}}> 
                                    Delete
                                </button>
                            </div>
                        </div>
                    );  
                }
                return <></>
            }) 

        }

        {props.total>0 && <div className="total"><h1>Total amount:</h1><div className="total-price">Rs.{props.total}</div></div>}
    </div>

    </>;
}


export default Cart;