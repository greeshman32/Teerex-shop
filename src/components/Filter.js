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
    
    const [filters, setFilters]= useState({color:new Map(),gender:new Map(),price:[],type:new Map()});

    const remove_filter = (filter_name,value) => {
        let temp = {...filters};

        if(filter_name==="price"){
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
        
        setFilters(temp);
    }
    
    const add_to_filter = (filter_name,value) => {
        let temp = {...filters};
        if(filter_name === "price"){
            temp.price.push(value);
        }
        else{
            temp[filter_name].set(value,true);
        }
        setFilters(temp);
    }

    const handleEvent=(event,type,value)=>{
        if(event.target.checked){
            add_to_filter(type,value);
        }
        else{
            remove_filter(type,value);
        }
        props.filter_changes(filters);
    }

    const Filter_options=()=>{
        return (<>
            <Grid>
            <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}><h4>Color</h4></AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"color","Red")} />} label="Red" />
                            <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"color","Blue")}/>} label="Blue" />
                            <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"color","Green")}/>} label="Green"/>
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><h4>Gender</h4></AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"gender","Men")}/>} label="Men" />
                        <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"gender","Women")}/>} label="Women" />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            </Grid>
            <Grid>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><h4>Price</h4></AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"price",[0,250])}/>} label="0 - Rs250" />
                        <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"price",[251,450])}/>} label="Rs251 - Rs450" />
                        <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"price",[450,4000])}/>} label="Rs450"/>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            </Grid>
            <Grid>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><h4>Type</h4></AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"type","Polo")}/>} label="Polo" />
                        <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"type","Hoodie")}/>} label="Hoodie" />
                        <FormControlLabel control={<Checkbox onChange={(event)=>handleEvent(event,"type","Basic")}/>} label="Basic"/>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            </Grid>
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
            onClose={handleToggler}
            onOpen={handleToggler}
            
          >
            {Filter_options()}
          </SwipeableDrawer>
          </Box>
          <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 200 },
          }}>
            {Filter_options()}
          </Box>
    </div>
    );
}


export default Filters;