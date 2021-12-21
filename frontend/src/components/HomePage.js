import React, { Component } from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {Grid, Button, ButtonGroup, createTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import RN from "./Room";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Redirect from "react"
import FinalRoom from "./FinalRoom";
import AnagramsHome from "./AnagramsHome";
import {useState} from "react";
import AskLeave from "./AskLeave";


const useStyles = makeStyles({
            buttonStep: {
                width: screen.width,
                height: screen.height,
                //backgroundImage: 'linear-gradient(#e66465, #9198e5)',
                backgroundImage: 'url("static/images/anaphoto3.jpg")',
                color:'#5FBDB3',
                fontFamily: ['"Poppins", sans-serif'],
                fontSize: screen.width/10
            }
        });



function HomePage (){
    const zooted = useStyles()

    const [backData,setBackData]=useState({
        roomCode: null
    })


    const componentDidMount=()=>{
        fetch('/user-in-room').then((response) => response.json()).then((data) => {setBackData({roomCode: data.code})});
    }

    function checkData(){
        if (backData.roomCode == null){
            componentDidMount();
        }
        else {
            console.log(backData.roomCode)
        }
    }
    checkData()


    const renderHomePage=()=>{
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Button className={zooted.buttonStep} to='/anagrams' component={Link} fullWidth={true}> Play Anagrams</Button>
            </Grid>
        </Grid>);
    };
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={(backData.roomCode  ? (<AskLeave />): renderHomePage())}/>
                <Route path='/anagrams' element={<AnagramsHome />}/>
                <Route path='/join' element={<RoomJoinPage />}/>
                <Route path='/create' element={<CreateRoomPage />}/>
                <Route path="/room/:roomCode" element={<RN />} />
                <Route path="/room/:roomCode/done" element={<FinalRoom />} />
            </Routes>
        </Router>
    );
} export default HomePage;