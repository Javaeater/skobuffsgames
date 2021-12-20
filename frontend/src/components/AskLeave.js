import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {ButtonGroup} from "@material-ui/core";

function RoomJoinPage() {
    const navigate = useNavigate()

    const exitPressed = ()=> {
        const requestOptions = {
            method: "Post",
            headers: {"Content-Type": "application/json"}
        };
        fetch('/exit-room', requestOptions).then((_response) => {
            navigate('/')
            location.reload();
        })
    }

    return(<Grid>
        <Grid item xs={12} align="center">
            <Button  style = {{maxHeight: screen.height,minHeight: screen.height, maxWidth: screen.width,minWidth: screen.width, color: 'white', background: "black" }} onClick={exitPressed}> Leave room</Button>
        </Grid>
    </Grid>)
} export default RoomJoinPage;