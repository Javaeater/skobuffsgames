import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import {
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@material-ui/core'
import {Link} from "react-router-dom"

function CreateRoomPage() {
    let defhiddenNum = 2
    let defWord = "hello"
    const navigate = useNavigate()
    const [backData,setBackData]=useState({
        guestCanPlay: true,
        hiddenNumm: defhiddenNum,
        anaWord: defWord,
        allWords: "cat"
    })

    const handleVotesChange=(e)=>{
        setBackData(data=>({
            ...data,
            hiddenNumm:e.target.value
        }))
    }

    const handleWordChange=(e)=>{
        setBackData(data=>({
            ...data,
            anaWord:e.target.value
        }))
    }

    const handleGuestCanPauseChange=(e)=>{
        setBackData(data=>({
            ...data,
            guestCanPlay:e.target.value=='true'?true:false
        }))
    }

    const handleRoomButtonPressed=async()=>{
        const feedBack = await fetch("/create-room",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                all_words: backData.allWords,
                guest_can_play: backData.guestCanPlay,
                hidden_num: backData.hiddenNumm,
                ana_word: backData.anaWord,
                points: 100
            })
        })
        const JsonFeedBack = await feedBack.json()
        console.log(JsonFeedBack)
        navigate("/room/" + JsonFeedBack.code)
    }

    return (
        <Grid container spacing={1}
              className="center">
            <Grid item xs={12} align="center"
            >
                <Typography component="h4" variant="h4"
                >
                    Create a room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl
                    component="fieldset"
                >
                    <FormHelperText>
                        <div align="center">
                            Let's play Anograms
                        </div>
                    </FormHelperText>
                    <RadioGroup
                        row
                        defaultValue="true"
                        onChange={handleGuestCanPauseChange}
                    >
                        <FormControlLabel value="true"
                                          control={
                                              <Radio color="primary"/>
                                          }
                                          label="Can join"
                                          labelPlacement="bottom"
                        />
                        <FormControlLabel value="false"
                                          control={
                                              <Radio color="secondary"/>
                                          }
                                          label="Cannot join"
                                          labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={12}
                align="center"
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={
                        handleRoomButtonPressed
                    }
                >
                    Create A Room
                </Button>
            </Grid>
            <Grid
                item
                xs={12}
                align="center"
            >
                <Button
                    color="secondary"
                    variant="contained"
                    to="/"
                    component={Link}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}; export default CreateRoomPage