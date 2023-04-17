import React, { Component } from "react";
import "../styles/CommentCard.css";


export class CommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleDelete = () => {
    this.props.deleteComment(this.props.postId,this.props.comment._id);
  };

  render() {
    const{name,comment,date}=this.props.comment;
    return (
      <div className="comment-card">
        <div className="comment-title_date">
          <h3>{name}</h3>
          <h5>
            Date:<span className="info">{new Date(date).toLocaleDateString()}</span>
          </h5>
          <div className="comcontent">
            <p>{comment}</p>
          </div>
        </div>
        <button onClick={this.handleDelete} className="del">Delete</button>
      </div>
    );
  }
}

export default CommentCard;
