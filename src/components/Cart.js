import Header from "./Header"




export const Cart=(props)=>{
    return<>
    
    <Header products={false} cart={true} No_items={props.No_items}/>
    
    </>;
}


export default Cart;