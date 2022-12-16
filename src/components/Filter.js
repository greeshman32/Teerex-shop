import { useState } from 'react';
import Grid from '@mui/system/Unstable_Grid/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Filters = () => {
    
    return (
    <>
        <Grid >
            <Grid>
                <h3>Color</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Red" />
                <FormControlLabel control={<Checkbox />} label="Blue" />
                <FormControlLabel control={<Checkbox />} label="Green"/>
                </FormGroup>
            </Grid>
            <Grid>
                <h3>Gender</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Men" />
                <FormControlLabel control={<Checkbox />} label="Women" />
                </FormGroup>
            </Grid>
            <Grid>
                <h3>Price</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox />} label="0 - Rs250" />
                <FormControlLabel control={<Checkbox />} label="Rs251 - Rs450" />
                <FormControlLabel control={<Checkbox />} label="Rs450"/>
                </FormGroup>
            </Grid>
            <Grid>
                <h3>Type</h3>
                <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Polo" />
                <FormControlLabel control={<Checkbox />} label="Hoodie" />
                <FormControlLabel control={<Checkbox />} label="Basic"/>
                </FormGroup>
            </Grid>
        </Grid>
    </>
    );
}


export default Filters;