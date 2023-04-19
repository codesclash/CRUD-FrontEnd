import React, { Component } from "react";
import "../styles/Card.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//-----------------------------------------------------------MUI
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialog: false,
    };
  }

  handleClickOpen = () => {
    this.setState({
      confirmDialog: true,
    });
  };
  handleClose = () => {
    this.setState({
      confirmDialog: false,
    });
  };

  handleDelete = () => {
    this.props.deletePost(this.props.post._id);

    this.setState({
      confirmDialog: false,
    });
  };

  render() {
    const { title, content, author, datePublished, imgLink } = this.props.post;
    const slicedTitle =
      title.trim().length > 22
        ? title.trim().slice(0, 22).concat("...")
        : title;
    const slicedContent =
      content.trim().length > 70
        ? content.trim().slice(0, 70).concat("...")
        : content;
    const slicedAuthor =
      author.trim().length > 25
        ? author.trim().slice(0, 25).concat("...")
        : author;
    return (
      <>
        <div className="card-container">
          <div className="card-img">
            <img src={imgLink} alt="img" width={"300px"} />
          </div>
          <div className="card-text">
            <div className="card-title_des">
              <h1>{slicedTitle}</h1>
              <p>{slicedContent}</p>
            </div>
            <div className="card-info">
              <h5>
                Author:
                <span className="info" id="author">
                  {slicedAuthor}
                </span>
              </h5>
              <h5>
                Date Published:
                <span className="info" id="date">
                  {new Date(datePublished).toLocaleDateString()}
                </span>
              </h5>
            </div>
            <div className="card-btns">
              <Link to={`/posts/${this.props.post._id}`}>
                <button className="card-btn">View</button>
              </Link>
              <Link to={`/post/update/${this.props.post._id}`}>
                <button className="card-btn">Edit</button>
              </Link>
              <button
                onClick={this.handleClickOpen}
                className="card-btn-del"
                id="del-btn"
              >
                Delete
              </button>
            </div>
          </div>

          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={this.state.confirmDialog}
          >
            <DialogContent color="primary" dividers>
              <Typography gutterBottom>
                Are you sure you want to delete this post?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.handleDelete} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
        <ToastContainer />
      </>
    );
  }
}
