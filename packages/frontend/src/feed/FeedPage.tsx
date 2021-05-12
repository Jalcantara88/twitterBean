import {
  BottomNavigation,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Snackbar
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { getFeed, submitTweet } from "./feedApi";
import {Alert, AlertTitle} from '@material-ui/lab';
import Slide from '@material-ui/core/Slide';
import '../../styles.css';

import { checkSession } from "../auth/authApi";

import { makeStyles } from '@material-ui/core/styles';

var thisUser;
var tweetCount = 0;
var myTweetCount = 0;
var tweetStyle;


const useStyles = makeStyles({
  tweet: {
    backgroundColor: '#b47fe3',
    //background: 'linear-gradient(to bottom, #516395, #614385 )',
    color: '#fff',
  },
  tweetAlt: {
    backgroundColor: '#9e77de',
    //background: 'linear-gradient(to bottom, #516395, #614385 )',
    color: '#fff',
  },
  myTweet: {
    backgroundColor: '#50afe2',
    color: "#fff",
  },
  myTweetAlt: {
    backgroundColor: '#5090e2',
    color: "#fff",
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



function transition(props) {
  return <Slide {...props} direction="down" />;
}

export default function FeedPage(props) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [tweetInputValue, setTweetInputValue] = useState<String>("");

  checkSession()
    .then(res => {
      console.log(res);
      //setCurrentUser("" + res.handle);
      thisUser = res.handle;
      //setCurrentUser(res.handle);
      //console.log("current user is: " + currentUser);
      console.log("current user is: " + thisUser);
    });

  
  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  };


  useEffect(() => {
    getTweets();

  }, []);

  async function getTweets() {
    const tweets = await getFeed();
    setTweets(tweets);
  }

  async function submit(evt: SyntheticEvent) {
    

    evt.preventDefault();

    const value = tweetInputValue?.trim();

    if (!value) {
      return;
    }

    try {
      console.log(evt);
      await submitTweet({ text: value })
      .then(res => console.log(res));
    }
    catch (e) {
      console.log("error found");
      setOpen(true);
    }
    setTweetInputValue("");
    await getTweets();
  }


  const classes = useStyles();

  //console.log(props);

  return (
    <Grid item xs={10}>
      <Paper elevation={2}>
        <form onSubmit={(evt) => submit(evt)}>
          <FormControl fullWidth>
            <Input
              id="tweet-input"
              placeholder="What's happening?"
              value={tweetInputValue}
              onChange={(evt) => setTweetInputValue(evt.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Input type="submit" value="Tweet"></Input>
          </FormControl>
        </form>
      </Paper>
      {tweets.map((tweet) => {
        
        console.log(tweet);


        if(tweet.user.handle === thisUser){
          if(myTweetCount % 2 === 0) {
            tweetStyle = classes.myTweet;
            myTweetCount++;
            
          }
          else{
            tweetStyle = classes.myTweetAlt;
            myTweetCount++;
          }
        }
        
        else {
          if(tweetCount % 2 === 0) {
            tweetStyle = classes.tweet;
            tweetCount++;
          }
          else {
            tweetStyle = classes.tweetAlt;
            tweetCount++;
          }

        }

        return(
          <Box key={tweet._id} padding={1}>
            <Paper  
              className={tweetStyle} 
              elevation={3}
            
            >
              <Box padding={1}>@{tweet.user.handle}</Box>
              <Box padding={1}>{tweet.text}</Box>
            </Paper>
          </Box>
        );
      })}
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        TransitionComponent={transition}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error">
        <AlertTitle>Error</AlertTitle>
          Please Log In To Tweet
        </Alert>
      </Snackbar>
    </Grid>
  );
}
