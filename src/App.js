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
  const [cartItemsCount, setCartItemsCount] = useState(()=>0);
  const [totalCost,setTotal] = useState(()=>0);

  const [areFiltersUsed,setAreFiltersUsed] = useState(false);
  const [checkbox,setCheckbox]=useState(()=>{return {
    Red:false,
    Blue:false,
    Green:false,
    Men:false,
    Women:false,
    "0 - 250Rs":false,
    "250Rs - 450Rs":false,
    "450Rs":false,
    Polo:false,
    Hoodie:false,
    Basic:false,
  }});
  const [filters, setFilters] = useState({Color:new Map(),Gender:new Map(),Price:[],Type:new Map()});
//API Calls  
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
  //Cart logic
  const manipulateCart=(id,value)=>{
    let temp=[...products];
    temp[id-1].cart+=value;

    setProducts(temp);
    setTotal(prev=> prev+(products[id-1].price*value));
    setCartItemsCount(prev=>prev+value);

  }

  const removeFromCart=(id)=>{
    manipulateCart(id,-1);
  }
  
  const addToCart = (id) => {
    const message = () => {
      if(products[id-1].cart === 0 ) return "Out of Stock";
      else if(products[id-1].cart === 1) return "Only 1 "+products[id-1].name+" avilable"; 
      else return "Only " + products[id-1].quantity+" " + products[id-1].name + "s available";  
    }

    if(products[id-1].cart===products[id-1].quantity){
      enqueueSnackbar(message(),{persist:false, variant:"warning"});
      return;
    }
      manipulateCart(id,1);
  }
  //filter logic

  const filterProducts=(filters)=>{
    let temp=[...products];

    for(let i=0;i<temp.length;i++){

      // checks if any checkbox is selected or 
      // checks the value is in the map of that type
      temp[i].display=(
        (filters.Color.size === 0 || filters.Color.has(temp[i].color)) &&
        (filters.Gender.size === 0 || filters.Gender.has(temp[i].gender)) &&
        (filters.Type.size === 0 || filters.Type.has(temp[i].type))
      );
      
      let inrange = filters.Price.length === 0;
      const { price } = temp[i];

      for(let j=0;j<filters.Price.length;j++){
        
        const [ lowerBound, upperBound ]= filters.Price[j];
        
        if(lowerBound <= price && upperBound >= price){
          inrange = true;
          break;
        }
        else{
          inrange=false;
        }
      }
      
      temp[i].display&=inrange;
    }
    //used to check if the filters are set, while implement the search.
    setAreFiltersUsed (
      (filters.Color.size !== 0) || 
      (filters.Gender.size !== 0) || 
      (filters.Type.size !== 0) || 
      (filters.Price.length !== 0));
    
    setProducts(temp);
  }
  //Search logic

  const handleSearch= (search_value) => {
    
    search_value = search_value.toLowerCase();
    let temp = [...products];

    for(let i=0;i<30;i++){
      let { name } = temp[i];
      name = name.toLowerCase(); 
     // checks for filtered elements and eleminate the non matching searches
      if( areFiltersUsed && temp[i].display && !name.includes(search_value) ){
          temp[i].display = false ;
      }
      // if no filteres applied dose a normal search
      else if( !areFiltersUsed ){
        
        if( name.search(search_value)!==-1 ) temp[i].display = true;
        else temp[i].display = false;
      }
    }
    setProducts(temp);
  }

  return (
    
      <Routes>
        <Route path = "/" 
        element = {
        <Products 
          products = { products }
          addToCart = { addToCart }
          removeFromCart = { removeFromCart }
          cartItemsCount = { cartItemsCount }
          filterProducts={filterProducts}
          handleSearch={handleSearch}
          filters={filters}
          setFilters={setFilters}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
        />
        }/>
        <Route path = "/cart" 
        element = {
        <Cart 
        cartItemsCount = { cartItemsCount } 
        products = { products }
        manipulateCart={manipulateCart}
        totalCost={totalCost}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        />} />
      </Routes>    
  ); 

}

export default App;
