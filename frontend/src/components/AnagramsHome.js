import React from "react";
import {ButtonGroup, Grid} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core";
const useStyles = makeStyles({
    buttonStep2: {
        width: screen.width/2,
        height: screen.height/1.123,
        backgroundImage: 'linear-gradient(to bottom, #3772c9, #0094db, #00adb9, #00bd71, #8bc20f)'
,
        color:'white',
        fontSize: screen.width/20
    },
    buttonStep3: {
        width: screen.width/2,
        height: screen.height/1.123,
        backgroundImage: 'linear-gradient(to top, #272f3e, #423863, #7b3272, #b71563, #e00b36)',
        color:'white',
        fontSize: screen.width/20
    }

});

function anagramsHome(){
    const classes = useStyles()
    const themex = createTheme({
        typography: {
            fontFamily: ["Poppins", 'sans-serif'].join(',')

        }
    })
    return (<Grid container spacing={1}>
            <Grid style={{color:"rgba(14, 192, 251, 0.43)", fontSize: screen.width/18}} item xs={12} align="center">
                <ThemeProvider theme={themex}>
                <Typography variant="h2">
                    Anagrams
                </Typography>
                </ThemeProvider>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation varient="contained" color="primary">

                </ButtonGroup>
                <Button className={classes.buttonStep2} to='/join' component={Link}> Join a Room</Button>
                <Button className={classes.buttonStep3} to='/create' component={Link}> Create a Room</Button>
            </Grid>
        </Grid>)

}; export default anagramsHome