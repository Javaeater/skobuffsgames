import React from "react";
import {ButtonGroup, Grid} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
    buttonStep2: {
        width: '100px',
        height: '50px',
        backgroundImage: 'linear-gradient(90deg, rgba(21,104,110,0.7066176812521884) 37%, rgba(20,255,98,0.6814075972185749) 57%)'
,
        color:'white',
        fontSize: '15px'
    },
    buttonStep3: {
        width: '100px',
        height: '50px',
        backgroundImage: 'linear-gradient(90deg, rgba(45,21,110,0.7066176812521884) 37%, rgba(255,20,104,0.6814075972185749) 57%)',
        color:'white',
        fontSize: '15px'
    }

});

function anagramsHome(){
    const classes = useStyles()
    return (<Grid container spacing={1} className="center">
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    Anagrams
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation varient="contained" color="primary">

                </ButtonGroup>
                <Button className={classes.buttonStep2} to='/join' component={Link}> Join a Room</Button>
                <Button className={classes.buttonStep3} to='/create' component={Link}> Create a Room</Button>
            </Grid>
        </Grid>)

}; export default anagramsHome