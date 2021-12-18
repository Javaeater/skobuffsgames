import React, {Component} from "react";
import {Link, useParams} from "react-router-dom";
import { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const RN = () => {
    let params = useParams()
    let defhiddenNum = 2


    const [backData,setBackData]= useState({
        guestCanPlay: true,
        hiddenNumm: 1,
        isHost: false,
        anaWord: "trgt",
        allwrds: "no"
    })
    const getRoomDetails=async()=> {
        fetch("/get-room" + "?code=" + params.roomCode).then((response) => response.json()).then(data => {
            setBackData({
                guestCanPlay: data.guest_can_play,
                hiddenNumm: data.hidden_num,
                isHost: data.is_host,
                anaWord: data.ana_word,
                allwrds: data.all_words
            })
            checkDetails()
        })
    }
    getRoomDetails()

    const [backData2, setBackData2] = useState({
        actWord: "start",
        filWord: "       "
    })

    const checkDetails=()=>{
        if(backData2.actWord == "start") {
            setBackData2({actWord: backData.anaWord, filWord: backData2.filWord})
        }
    }

    const handleLetterPress =(posi)=>{
        if (posi == 1) {
            if(backData2.actWord.charAt(0) != " " ){
                setBackData2({actWord: backData2.actWord.replace(backData2.actWord.charAt(0), " "), filWord: backData2.filWord.replace(" ", backData2.actWord.charAt(0))})
                console.log(backData.allwrds)
            }
            else {
                setBackData2({actWord: backData2.actWord, filWord: backData2.filWord})
            }
        }

        else if (posi == 2) {
            if(backData2.actWord.charAt(1) != " " ){
                setBackData2({actWord: backData2.actWord.replace(backData2.actWord.charAt(1), " "), filWord: backData2.filWord.replace(" ", backData2.actWord.charAt(1))})

            }
            else {
                setBackData2({actWord: backData2.actWord, filWord: backData2.filWord})
            }
        }

        else if (posi == 3) {
            if(backData2.actWord.charAt(2) != " " ){
                setBackData2({actWord: backData2.actWord.replace(backData2.actWord.charAt(2), " "), filWord: backData2.filWord.replace(" ", backData2.actWord.charAt(2))})

            }
            else {
                setBackData2({actWord: backData2.actWord, filWord: backData2.filWord})
            }
        }

        else if (posi == 4) {
            if(backData2.actWord.charAt(3) != " " ){
                setBackData2({actWord: backData2.actWord.replace(backData2.actWord.charAt(3), " "), filWord: backData2.filWord.replace(" ", backData2.actWord.charAt(3))})

            }
            else {
                setBackData2({actWord: backData2.actWord, filWord: backData2.filWord})
            }
        }

        else if (posi == 5) {
            if(backData2.actWord.charAt(4) != " " ){
                setBackData2({actWord: backData2.actWord.replace(backData2.actWord.charAt(4), " "), filWord: backData2.filWord.replace(" ", backData2.actWord.charAt(4))})

            }
            else {
                setBackData2({actWord: backData2.actWord, filWord: backData2.filWord})
            }
        }

        else if (posi == 6) {
            if(backData2.actWord.charAt(5) != " " ){
                setBackData2({actWord: backData2.actWord.replace(backData2.actWord.charAt(5), " "), filWord: backData2.filWord.replace(" ", backData2.actWord.charAt(5))})

            }
            else {
                setBackData2({actWord: backData2.actWord, filWord: backData2.filWord})
            }
        }

        else if (posi == 7) {
            if(backData2.actWord.charAt(6) != " " ){
                setBackData2({actWord: backData2.actWord.replace(backData2.actWord.charAt(6), " "), filWord: backData2.filWord.replace(" ", backData2.actWord.charAt(6))})

            }
            else {
                setBackData2({actWord: backData2.actWord, filWord: backData2.filWord})
            }
        }


        else {if(backData2.actWord.toString() == backData.anaWord.toString() && backData2.filWord.toString() != backData.anaWord.toString()){
            setBackData2({actWord: " ", filWord: backData2.filWord.replace(" ", "iyyyyyy")})

        }


        }
        console.log(backData2.actWord)

    }


    const handleLetterReturn =(posi)=>{
        if (posi == 1) {
            setBackData2({actWord: backData2.actWord.replace(' ', backData2.filWord.charAt(0)), filWord: backData2.filWord.replace(backData2.filWord.charAt(0), " ")})
            console.log(backData2.actWord)
        }

        else if (posi == 2) {
            setBackData2({actWord: backData2.actWord.replace(' ', backData2.filWord.charAt(1)), filWord: backData2.filWord.replace(backData2.filWord.charAt(1), " ")})
            console.log(backData2.actWord)
        }

        else if (posi == 3) {
            setBackData2({actWord: backData2.actWord.replace(' ', backData2.filWord.charAt(2)), filWord: backData2.filWord.replace(backData2.filWord.charAt(2), " ")})
            console.log(backData2.actWord)
        }

        else if (posi == 4) {
            setBackData2({actWord: backData2.actWord.replace(' ', backData2.filWord.charAt(3)), filWord: backData2.filWord.replace(backData2.filWord.charAt(3), " ")})
            console.log(backData2.actWord)
        }

        else if (posi == 5) {
            setBackData2({actWord: backData2.actWord.replace(' ', backData2.filWord.charAt(4)), filWord: backData2.filWord.replace(backData2.filWord.charAt(4), " ")})
            console.log(backData2.actWord)
        }

        else if (posi == 6) {
            setBackData2({actWord: backData2.actWord.replace(' ', backData2.filWord.charAt(5)), filWord: backData2.filWord.replace(backData2.filWord.charAt(5), " ")})
            console.log(backData2.actWord)
        }

        else if (posi == 7) {
            setBackData2({actWord: backData2.actWord.replace(' ', backData2.filWord.charAt(6)), filWord: backData2.filWord.replace(backData2.filWord.charAt(6), " ")})
            console.log(backData2.actWord)
        }

    }


    return (<Grid container spacing={1} className="center">
        <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
                Anagrams
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
                {backData.anaWord}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
                {backData2.actWord}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterPress(1)}>
                {backData2.actWord.charAt(0)}
            </Button>
            <Button variant="contained" color="secondary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterPress(2)}>
                {backData2.actWord.charAt(1)}
            </Button>
            <Button variant="contained" color="secondary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterPress(3)}>
                {backData2.actWord.charAt(2)}
            </Button>
            <Button variant="contained" color="secondary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterPress(4)}>
                {backData2.actWord.charAt(3)}
            </Button>
            <Button variant="contained" color="secondary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterPress(5)}>
                {backData2.actWord.charAt(4)}
            </Button>
            <Button variant="contained" color="secondary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterPress(6)}>
                {backData2.actWord.charAt(5)}
            </Button>
            <Button variant="contained" color="secondary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterPress(7)}>
                {backData2.actWord.charAt(6)}
            </Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterReturn(1)}>
                {backData2.filWord.charAt(0)}
            </Button>
            <Button variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterReturn(2)}>
                {backData2.filWord.charAt(1)}
            </Button>
            <Button variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterReturn(3)}>
                {backData2.filWord.charAt(2)}
            </Button>
            <Button variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterReturn(4)}>
                {backData2.filWord.charAt(3)}
            </Button>
            <Button variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterReturn(5)}>
                {backData2.filWord.charAt(4)}
            </Button>
            <Button variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterReturn(6)}>
                {backData2.filWord.charAt(5)}
            </Button>
            <Button variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '200px', minWidth: '30px', minHeight: '30px', fontSize: '30px'}} onClick={() => handleLetterReturn(7)}>
                {backData2.filWord.charAt(6)}
            </Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button variant="contained" color="default" onClick >
                Send
            </Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" to="/" component={Link}>
                Back
            </Button>
        </Grid>
    </Grid>)
}; export default RN