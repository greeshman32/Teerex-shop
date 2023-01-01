import {  useState } from 'react';
import Grid from '@mui/system/Unstable_Grid/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';



const Filters = (props) => {

    const filterList ={
        Color:{
            Red:"Red",
            Blue:"Blue",
            Green:"Green",
        },
        Gender:{
            Men:"Men",
            Women:"Women",
        },
        Price:{
            "0 - 250Rs":[0,250],
            "250Rs - 450Rs":[250,450],
            "450Rs":[450,7000],
        },
        Type:{
            Polo:"Polo",
            Hoodie:"Hoodie",
            Basic:"Basic",
        },
    };

    
    
    const removeFilter = (filter_name,value) => {
        let temp = {...props.filters};

        if(filter_name==="Price"){
            let index;
            for(let i=0;i<temp.price.length;i++){
                if(temp.price[i][0]===value[0]) {
                    index=i;
                    break;
                }
            }
            temp.price.splice(index,1);
        }
        else{
            temp[filter_name].delete(value);
        }
        
        props.setFilters(temp);
    }
    
    const addFilter = (filter_name,value) => {
        let temp = {...props.filters};
        if(filter_name === "Price"){
            temp.price.push(value);
        }
        else{
            temp[filter_name].set(value,true);
        }
        props.setFilters(temp);
    }

    const handleEvent=(event,type,value)=>{
        let temp=props.checkbox;
        temp[value] = event.target.checked;
        props.setCheckbox(temp);
        if(event.target.checked){
            addFilter(type,value);
        }
        else{
            removeFilter(type,value);
        }
        props.filterProducts(props.filters);
    }

    const FilterOptions=()=>{
        return (<>
        {
            Object.keys(filterList).map((filter)=>{
                return(<Grid key={filter}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}><h4>{filter}</h4></AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                        {Object.keys(filterList[filter]).map((key) => {
                            return <FormControlLabel 
                                    control={
                                        <Checkbox 
                                        key={key}
                                        checked={props.checkbox[key]}
                                        onChange={(event)=>handleEvent(event,filter,filterList[filter][key])} />} 
                                        label={key} />
                                    }
                                )
                        }
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            </Grid>);
            })
        }
            
            
            </>);
    }
    
   const [toggler, setToggler] = useState(false);

    const handleToggler=()=>{
        setToggler(prev => prev^true ); 
    }
    return (
    <div className='filters'>
        <Box
        className='center'
        sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 200 },
          }}>
       <button className='filter button' onClick={handleToggler}><FilterAltIcon/></button>
          <SwipeableDrawer
            anchor="left"
            open={toggler}
            onClose={()=>handleToggler()}
            onOpen={()=>handleToggler()}
          >
            {FilterOptions()}
          </SwipeableDrawer>
          </Box>
          <Box
          p={5}
          
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 200 },
            position:'sticky'
          }}>
            {FilterOptions()}
          </Box>
    </div>
    );
}


export default Filters;