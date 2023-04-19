import React, { Component } from "react";
import "../styles/CommentCard.css";


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


export class CommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialog: false,
    };
  }
  handleDelete = () => {
    this.props.deleteComment(this.props.postId, this.props.comment._id);
  };

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

  render() {
    const { name, comment, date } = this.props.comment;
    return (
      <div className="comment-card">
        <div className="comment-title_date">
          <h3>{name}</h3>
          <h5>
            Date:
            <span className="info">{new Date(date).toLocaleDateString()}</span>
          </h5>
          <div className="comcontent">
            <p>{comment}</p>
          </div>
        </div>
        <button onClick={this.handleClickOpen} className="del">
          Delete
        </button>
        <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={this.state.confirmDialog}
          >
            <DialogContent color="primary" dividers>
              <Typography gutterBottom>
                Are you sure you want to delete this comment?
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
    );
  }
}

export default CommentCard;
