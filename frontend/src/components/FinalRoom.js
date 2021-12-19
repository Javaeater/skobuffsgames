import {Link, useNavigate, useParams, Route} from "react-router-dom";
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import {ListItem, ListItemText, List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useLocation} from "react-router-dom";


function FinalRoom() {
    const navigate = useNavigate()
    const [backData,setBackData]=useState({
        roomCode: useParams().roomCode
    })


    const [backData2,setBackData2]=useState({
        guestCanPlay: true,
        allWords: " ",
        hiddenNumm: 3,
        isHost: false,
        points: 0,
        totWord: " "
    })

    let wordPair = backData2.totWord.split(',')
    let listObj = []
    for (let i = 0; i < wordPair.length; i++) {
        let obj = {word: wordPair[i]}
        listObj.push(obj)

    }
    let uniqList = [...new Map(listObj.map(item => [item['word'], item])).values()]
    console.log(uniqList)
    const getRoomDetails=async()=> {
        fetch("/get-room" + "?code=" + backData.roomCode).then((response) => response.json()).then(data => {
            setBackData2({
                guestCanPlay: data.guest_can_play,
                hiddenNumm: data.hidden_num,
                isHost: data.is_host,
                points: data.points,
                allWords: data.all_words,
                totWord: data.final_words})
        })
    }
    getRoomDetails()

    const exitPressed = ()=> {
        const requestOptions = {
            method: "Post",
            headers: {"Content-Type": "application/json"}
        };
        fetch('/exit-room', requestOptions).then((_response) => {
            navigate('/')
        })
    }

    return (<Grid container spacing={1} className="center">
        <Grid item xs={12} align="center"
        >
            <Typography component="h4" variant="h4"
            >
                Total Points: {backData2.points}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Box sx={{ width: '100%', height: 400, maxWidth: 100, bgcolor: 'background.paper', overflow: 'auto'}}>
                <List dense={true}>
                    {uniqList.map(item => (
                        <ListItem key={item.word} align="center">
                            <ListItemText primary={item.word} align="center"/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Grid >
        <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" onClick={exitPressed}>
                Exit
            </Button>
        </Grid>
    </Grid>)
}; export default FinalRoom