import React, { Component } from "react";
import "./styles/CreatePost.css";
import {
  createPost,
  resetMessage,
  resetError,
} from "../redux/actions/postActions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
//-----------------------------------------------------------MUI
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import purple from "@mui/material/colors/purple";

const theme = createTheme({
  palette: {
    primary: purple,
  },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      imgLink: "",
      author: "",
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

  componentDidMount() {
    this.props.toggleBtn();
  }

  componentWillUnmount() {
    this.props.toggleBtn();
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //post data to the server

    const post = {
      title: this.state.title,
      content: this.state.content,
      imgLink: this.state.imgLink,
      author: this.state.author,
    };
    this.props.createPost(post);

    setTimeout(() => {
      if (this.props.successMessage.length > 0) {
        this.notify(this.props.successMessage);
        this.props.resetMsg();
      } else {
        this.notifyError(this.props.error);
        this.props.resetError();
      }
    }, 200);

    this.setState({
      title: "",
      content: "",
      imgLink: "",
      author: "",
      confirmDialog: false,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  notify = (successMessage) =>
    toast.success(successMessage, {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });
  notifyError = (successMessage) =>
    toast.error(successMessage, {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

  render() {
    const { title, content, author } = this.state;
    let createPostBtnDisabled =
      title.length > 4 &&
      content.length > 11 &&
      author.length > 5 &&
      this.state.imgLink.length > 10 &&
      this.state.imgLink.includes("https")
        ? false
        : true;

    return (
      <>
      <div className="create-post-main" ><Link to={"/"}><button className="go-back-home"> &lt; Click Here To Go To Home</button></Link>
        <div className="create-post">
          <div className="preview-container">
            <h1> Image Preview</h1>
            <div className="preview">
              <img
                className="previewImg"
                src={
                  !this.state.imgLink.includes("https")
                    ? "https://jkfenner.com/wp-content/uploads/2019/11/default.jpg"
                    : this.state.imgLink
                }
                alt=""
              />
            </div>
          </div>

          <div className="form-container">
            <h1>Create A New Post</h1>
            <div className="form-update-create">
              <label className="label" htmlFor="title">
                Title*
              </label>
              <input
                className="input"
                onChange={this.handleInputChange}
                value={this.state.title}
                type="text"
                name="title"
                id="title"
              />
              {this.state.title.length < 5 ? (
                <div className="error">Enter Atleast 5 Characters </div>
              ) : (
                <div className="error"></div>
              )}
              <label className="label" htmlFor="imaLink">
                Image*
              </label>
              <input
                value={this.state.imgLink}
                onChange={this.handleInputChange}
                className="input img"
                type="text"
                name="imgLink"
                id="imgLink"
              />
              {this.state.imgLink.length <= 0 ? (
                <div className="error">Please Provide a Valid https link</div>
              ) : this.state.imgLink.includes("https") &&
                this.state.imgLink.length > 10 ? (
                <div className="error"></div>
              ) : (
                <div className="error">Please Provide a Valid https link</div>
              )}
              <label className="label" htmlFor="content">
                Description*
              </label>
              <textarea
                onChange={this.handleInputChange}
                className="input"
                value={this.state.content}
                name="content"
                id="content"
                cols="80"
                rows="10"
              ></textarea>
              {this.state.content.length < 12 ? (
                <div className="error">Enter Atleast 12 Characters </div>
              ) : (
                <div className="error"></div>
              )}
              <label className="label" htmlFor="author">
                Author*
              </label>
              <input
                value={this.state.author}
                onChange={this.handleInputChange}
                className="input"
                type="text"
                name="author"
                id="author"
              />{" "}
              {this.state.author.length < 6 ? (
                <div className="error">Enter Atleast 6 Characters </div>
              ) : (
                <div className="error"></div>
              )}
              {!createPostBtnDisabled ? (
                <button
                  className="btn"
                  onClick={this.handleClickOpen}
                  id="submitbtn"
                >
                  {this.props.isLoading ? "Wait..." : "Create Post"}
                </button>
              ) : (
                <button className="disabledbtn">Create Post</button>
              )}
              <div className="info">
                <p>*Required Fields</p>
              </div>
            </div>
          </div>
          <ThemeProvider theme={theme}>
            <BootstrapDialog
              aria-labelledby="customized-dialog-title"
              open={this.state.confirmDialog}
            >
              <DialogContent color="primary" dividers>
                <Typography gutterBottom>
                  Are you sure you want to create this post?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button onClick={this.handleSubmit} autoFocus>
                  Create Post
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </ThemeProvider>
        </div>
        </div>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    successMessage: state.successMessage,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post)),
    resetMsg: () => dispatch(resetMessage()),
    resetError: () => dispatch(resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
