import React, { ChangeEvent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid lightskyblue",
    backgroundColor: "lightgray",
    marginTop: "5%",
    borderRadius: "0.9%",
  },
}));

const AddPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleAddPost = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "ADD" });
        router.push("/");
      });
  };
  return (
    <Grid container direction="column" spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <TextField
          required
          id="standard-required"
          label="Title Of the Post"
          value={title}
          variant="outlined"
          autoComplete="off"
          style={{ backgroundColor: "white", borderRadius: "2%", width: "50%" }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleTitleChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="insert-body"
          label="Body of the Post"
          value={body}
          variant="outlined"
          size="medium"
          style={{ backgroundColor: "white" }}
          multiline
          fullWidth
          rows={4}
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleBodyChange(e)}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleAddPost}
        >
          {" "}
          ADD A POST{" "}
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddPost;
