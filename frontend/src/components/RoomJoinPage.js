import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core";


function RoomJoinPage({navigation}) {
    const navigate = useNavigate()
    const [backData,setBackData]=useState({
        roomCode:"",
        error: ""
    })
    const handleTextFieldChange=(e)=>{
        setBackData(data=> ({roomCode: e.target.value
        }));
    }

    const roomButtonPressed =()=>{
        const feedBack = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                code:backData.roomCode
            })
        };
        fetch('/join-room', feedBack).then((response) => {
            if (response.ok) {
                navigate(`/room/${backData.roomCode}`)
            }
            else {
                setBackData(data=> ({error: "Room not found."}))
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const themex = createTheme({
        typography: {
            fontFamily: ["Poppins", 'sans-serif'].join(','),
            fontSize: screen.width/35

        }
    })

    return (
            <Grid container spacing={1} className="halfcenter">
                <Grid item xs={12} align="center">
                    <ThemeProvider theme={themex}>
                    <Typography style={{color:"#5FBDB3"}} variant="h4" component="h4">
                        Join a Room
                    </Typography>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        error= {backData.error}
                        label="Code"
                        placeholder="Enter a Room Code"
                        value={backData.roomCode}
                        helperText={backData.error}
                        varient={"outlined"}
                        onChange={handleTextFieldChange}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button style={{width: screen.width, height: screen.height/10}} variant="contained" color="primary" onClick={roomButtonPressed} fullWidth={true}>
                        Enter Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button style={{width: screen.width, height: screen.height/10}} variant="contained" color="secondary" to="/" component={Link}  fullWidth={true}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        )
} export default RoomJoinPage;