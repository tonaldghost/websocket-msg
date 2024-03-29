import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { CTX } from "./Store";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatBox: {
    width: "85%"
  },
  button: {
    width: "15%",
    marginLeft: "10px"
  },
  chip: {
    margin: "5px"
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  //  CTX store of chats
  const { allChats, sendChat, user } = React.useContext(CTX);

  const topics = Object.keys(allChats);

  //  local state hooks
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState("");

  return (
    <Paper className={classes.root}>
      <Typography variant="h3" component="h3">
        gabCode
      </Typography>
      <Typography variant="h5" component="h5">
        {activeTopic}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
          <List>
            {topics.map(topic => (
              <ListItem
                key={topic}
                onClick={e => changeActiveTopic(e.target.innerText)}
                button
              >
                <ListItemText primary={topic} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {allChats[activeTopic].map((chat, idx) => (
            <div key={idx} className={classes.flex}>
              <Chip label={chat.from} className={classes.chip} />
              <Typography variant="body1" gutterBottom>
                {chat.msg}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.flex}>
        <TextField
          className={classes.chatBox}
          label="chat..."
          variant="outlined"
          value={textValue}
          onChange={e => changeTextValue(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => {
            sendChat({ from: user, msg: textValue, topic: activeTopic });
            changeTextValue("");
          }}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default Dashboard;
