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
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core";

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
        console.log(JsonFeedBack.ana_word)
        navigate("/room/" + JsonFeedBack.code)
    }

    const themex = createTheme({
        typography: {
            fontFamily: ["Poppins", 'sans-serif'].join(','),
            fontSize: screen.width/10

        }
    })

    return (
        <Grid container spacing={1}
              className="halfcenter">

            <Grid  item xs={12} align="center">
                <ThemeProvider theme={themex}>
                <Typography style={{color:"rgba(14, 192, 251, 0.43)"}} component="h3">
                    Create a Room
                </Typography>
                </ThemeProvider>
            </Grid>
            <Grid item xs={12} align="center">
            </Grid>
            <Grid
                item
                xs={12}
                align="center"
            >
                <Button
                    style={{width: screen.width, height: screen.height/10}}
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
                style={{color:'blue'}}
            >
                <Button
                    style={{width: screen.width, height: screen.height/10}}
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

/* code if radio group needs to come back
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
 */