import {  useState, useLayoutEffect } from "react";
import './App.css';
import Products  from "./components/Products"
import Cart  from "./components/Cart";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useSnackbar } from "notistack";


export function App() {
  const { enqueueSnackbar } = useSnackbar();

  const [products, setProducts] = useState(()=>[]);
  const [count, setCount] = useState(()=>0);
  const [total,setTotal] = useState(()=>0);
  
  const fetch_API= async()=>{
    let data = await axios.get("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json");

    setProducts(data.data.map(val=>{
      val={
        ...val,
        display:true,
        cart:0,
      }
      return val;
    }));
  }

  useLayoutEffect(()=>{
    fetch_API();
  },[]);
  
  const manipulate_cart=(id,value)=>{
    let temp=[...products];
    temp[id-1].cart+=value;

    setProducts(temp);
    setTotal(prev=> prev+(products[id-1].price*value));
    setCount(prev=>prev+value);

  }

  const remove_from_cart=(id)=>{
    manipulate_cart(id,-1);
  }
  
  const add_to_cart=(id)=>{
    const message=()=>{
      if(products[id-1].cart === 0 ) return "Out of Stock";
      else if(products[id-1].cart === 1) return "Only 1 "+products[id-1].name+" avilable"; 
      else return "Only " + products[id-1].quantity+" " + products[id-1].name + "s available";  
    }

    if(products[id-1].cart===products[id-1].quantity){
      enqueueSnackbar(message(),{persist:false, variant:"warning"});
      return;
    }
      manipulate_cart(id,1);
  }
 
  return (
    
      <Routes>
        <Route path = "/" 
        element = {
        <Products 
          products = { products }
          add_to_cart = { add_to_cart }
          remove_from_cart = { remove_from_cart }
          No_items = { count }
        />
        }/>
        <Route path = "/cart" 
        element = {
        <Cart 
        No_items = { count } 
        products = { products }
        manipulate_cart={manipulate_cart}
        total={total}
        add_to_cart={add_to_cart}
        remove_from_cart={remove_from_cart}
        />} />
      </Routes>    
  ); 

}

export default App;
