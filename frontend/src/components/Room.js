import React, {Component, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTimer } from 'react-timer-hook';


const RN = () => {
    let params = useParams()
    let defhiddenNum = 2
    const navigate = useNavigate()
    const [backData3, setBackData3] = useState({
        points: 0,
        words: []
    })
    const [backData4,setBackData4]=useState({
        roomCode: params.roomCode,
        error: ""
    })

    const [backData,setBackData]= useState({
        guestCanPlay: true,
        hiddenNumm: 1,
        isHost: false,
        anaWord: "trgt",
        allWrds: "no"
    })

    const checkLen =()=> {
        if (backData3.words.length < 1) {
            console.log("skeee")
            setBackData3({
                words : backData3.words.concat(["oof", "no", "words", "that's", "rough"]),
                points: backData3.points})
        }
    }

    const roomButtonPressed =async()=>{
        checkLen()
        const feedBack = await fetch("/final-room",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                final_words : backData3.words.toString(),
                all_words: backData.allWrds,
                guest_can_play: backData.guestCanPlay,
                hidden_num: backData.hiddenNumm,
                ana_word: backData.anaWord,
                points: backData3.points
            })
        })
        const JsonFeedBack = await feedBack.json()
        console.log(JsonFeedBack)
        navigate("/room/" + JsonFeedBack.code + "/done")
    }

        // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(60);

        useEffect(() => {
            // exit early when we reach 0
            if (!timeLeft) return;

            // save intervalId to clear the interval when the
            // component re-renders
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            // clear interval on re-render to avoid memory leaks
            return () => clearInterval(intervalId);
            // add timeLeft as a dependency to re-rerun the effect
            // when we update it
        }, [timeLeft]);
        if(timeLeft == 0) {
            roomButtonPressed()
        }

    const handelWordPress= ()=> {
        let word = backData.allWrds.split(',')
            for(let i = 0; i < word.length; i++) {
                let bl = backData3.words.includes(word[i])
                console.log(word[i])
                if (backData2.filWord.replace(/\s/g, '') == word[i] && bl == false) {
                    let pWord = word[i].length
                    switch (pWord){
                        case(3):
                            setBackData3({points: backData3.points + 150, words: backData3.words.concat(word[i])})
                            break;
                        case(4):
                            setBackData3({points: backData3.points + 300, words: backData3.words.concat(word[i])})
                            break;
                        case(5):
                            setBackData3({points: backData3.points + 600, words: backData3.words.concat(word[i])})
                            break;
                        case(6):
                            setBackData3({points: backData3.points + 1200, words: backData3.words.concat(word[i])})
                            break;
                        case(7):
                            setBackData3({points: backData3.points + 2400, words: backData3.words.concat(word[i])})
                            break;
                        default:
                            setBackData3({points: backData3.points, words: backData3.words})
                            break;
                    }
                }
            }
        console.log(backData3.words)
    }

    const getRoomDetails=async()=> {
        fetch("/get-room" + "?code=" + params.roomCode).then((response) => response.json()).then(data => {
            setBackData({
                guestCanPlay: data.guest_can_play,
                hiddenNumm: data.hidden_num,
                isHost: data.is_host,
                anaWord: data.ana_word,
                allWrds: data.all_words,

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
                console.log(backData.allWrds)
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
                {timeLeft}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
                {backData3.points}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
                {backData2.filWord}
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
            <Button variant="contained" color="default" onClick={handelWordPress}>
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