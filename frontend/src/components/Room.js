import React, {Component, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTimer } from 'react-timer-hook';
import {ButtonGroup} from "@material-ui/core";
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core";



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

    const roomButtonPressed =()=>{
        checkLen()
        const feedBack = {
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
        }
        const JsonFeedBack = feedBack
        //console.log(JsonFeedBack)
        setTimeout(()=>{fetch("/final-room", feedBack).then((response)=> {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        }).then((data)=> navigate("/room/" + data.code + "/done"))}, 20)
        //setTimeout(() => {navigate("/room/" + JsonFeedBack.code + "/done")}, 5000);
    }

        // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(90);

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

    const themex = createTheme({
        typography: {
            fontFamily: ["Poppins", 'sans-serif'].join(','),
            fontSize: screen.width/40

        }
    })


    return (<Grid container spacing={1} className="center">
        <ThemeProvider theme={themex}>
        <Grid item xs={12} align="center">
            <Typography style={{color:"rgba(14, 192, 251, 0.43)"}} variant="h4" component="h4">
                Time Left {((timeLeft % 3600) /60) | 0}:{("0" + (timeLeft %60)).slice(-2)}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography style={{color:"rgba(14, 192, 251, 0.43)"}} variant="h4" component="h4">
                Points {backData3.points}
            </Typography>
        </Grid>
        </ThemeProvider>
        <Grid item xs={12} align="center">
            <Button style={{height: screen.height/18, width: screen.width/10, backgroundImage: 'radial-gradient(circle, #e9e8e6, #e2dfd5, #dad6c5, #d1ceb5, #c6c6a6)'}}variant="contained" color="default" onClick={handelWordPress}>
                Send
            </Button>
        </Grid>
        <Grid item xs={12} align="center">
            <ButtonGroup size="large" aria-label="large button group">
                <Button variant="contained" color="primary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #cc9b2b, #c7a84c, #c4b36a, #c4bd88, #c6c6a6)', color:'brown'}} onClick={() => handleLetterReturn(1)}>
                    {backData2.filWord.charAt(0)}
                </Button>
                <Button variant="contained" color="primary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #cc9b2b, #c7a84c, #c4b36a, #c4bd88, #c6c6a6)', color:'brown'}} onClick={() => handleLetterReturn(2)}>
                    {backData2.filWord.charAt(1)}
                </Button>
                <Button variant="contained" color="primary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #cc9b2b, #c7a84c, #c4b36a, #c4bd88, #c6c6a6)', color:'brown'}} onClick={() => handleLetterReturn(3)}>
                    {backData2.filWord.charAt(2)}
                </Button>
                <Button variant="contained" color="primary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #cc9b2b, #c7a84c, #c4b36a, #c4bd88, #c6c6a6)', color:'brown'}} onClick={() => handleLetterReturn(4)}>
                    {backData2.filWord.charAt(3)}
                </Button>
                <Button variant="contained" color="primary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #cc9b2b, #c7a84c, #c4b36a, #c4bd88, #c6c6a6)', color:'brown'}} onClick={() => handleLetterReturn(5)}>
                    {backData2.filWord.charAt(4)}
                </Button>
                <Button variant="contained" color="primary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #cc9b2b, #c7a84c, #c4b36a, #c4bd88, #c6c6a6)', color:'brown'}} onClick={() => handleLetterReturn(6)}>
                    {backData2.filWord.charAt(5)}
                </Button>
                <Button variant="contained" color="primary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #cc9b2b, #c7a84c, #c4b36a, #c4bd88, #c6c6a6)', color:'brown'}} onClick={() => handleLetterReturn(7)}>
                    {backData2.filWord.charAt(6)}
                </Button>
            </ButtonGroup>
        </Grid>
        <Grid item xs={12} align="center">
            <ButtonGroup size="large" aria-label="large button group">
            <Button variant="contained" color="secondary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #d4a945, #d9bd6b, #e0d190, #e9e3b6, #f5f5dc)'}} onClick={() => handleLetterPress(1)}>
                {backData2.actWord.charAt(0)}
            </Button>
            <Button variant="contained" color="secondary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #d4a945, #d9bd6b, #e0d190, #e9e3b6, #f5f5dc)'}} onClick={() => handleLetterPress(2)}>
                {backData2.actWord.charAt(1)}
            </Button>
            <Button variant="contained" color="secondary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #d4a945, #d9bd6b, #e0d190, #e9e3b6, #f5f5dc)'}} onClick={() => handleLetterPress(3)}>
                {backData2.actWord.charAt(2)}
            </Button>
            <Button variant="contained" color="secondary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #d4a945, #d9bd6b, #e0d190, #e9e3b6, #f5f5dc)'}} onClick={() => handleLetterPress(4)}>
                {backData2.actWord.charAt(3)}
            </Button>
            <Button variant="contained" color="secondary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #d4a945, #d9bd6b, #e0d190, #e9e3b6, #f5f5dc)'}} onClick={() => handleLetterPress(5)}>
                {backData2.actWord.charAt(4)}
            </Button>
            <Button variant="contained" color="secondary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #d4a945, #d9bd6b, #e0d190, #e9e3b6, #f5f5dc)'}} onClick={() => handleLetterPress(6)}>
                {backData2.actWord.charAt(5)}
            </Button>
            <Button variant="contained" color="secondary" style={{width: screen.width/8, height: screen.width/8, fontSize: screen.width/15, backgroundImage: 'radial-gradient(circle, #d4a945, #d9bd6b, #e0d190, #e9e3b6, #f5f5dc)'}} onClick={() => handleLetterPress(7)}>
                {backData2.actWord.charAt(6)}
            </Button>
            </ButtonGroup>
        </Grid>
        <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" to="/" component={Link}>
                Back
            </Button>
        </Grid>
    </Grid>)
}; export default RN