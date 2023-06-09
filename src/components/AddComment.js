import React, { Component } from "react";
import "./styles/AddComment.css";
import { connect } from "react-redux";
import { createComment, fetchSinglePost } from "../redux/actions/postActions";
import { ToastContainer,} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      comment: "",
    };
  }
  getPostId = () => {
    return window.location.pathname.split("/")[2];
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      name: this.state.name,
      comment: this.state.comment,
    };
    this.props.createComment(this.getPostId(), comment);
    

   /* setTimeout(()=>{
      console.log(this.buttonRef)
      this.buttonRef.current.scrollIntoView({ behavior: "smooth" });
    },1000)
    */
  };


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    
    const createCommentBtn =
      this.state.name.length > 2 && this.state.comment.length > 7;
    return (<>
    <ToastContainer />
      <div className="comment-container">
        <h3 id="heading-flag">Add Your Thoughts</h3>
        <div className="form-comments">
          <input
            name="name"
            onChange={this.handleChange}
            value={this.name}
            className="input"
            type="text"
            placeholder="Name"
          />{" "}
          {this.state.name.length < 3 ? (
            <div className="comment-error">Enter Atleast 3 Characters</div>
          ) : (
            <div className="comment-error"></div>
          )}
          <textarea
            name="comment"
            onChange={this.handleChange}
            value={this.comment}
            className="input"
            type="text"
            placeholder="Comment"
          />
          {this.state.comment.length < 8 ? (
            <div className="comment-error">Enter Atleast 8 Characters</div>
          ) : (
            <div className="comment-error"></div>
          )}
          {createCommentBtn ? (
            <button className="btn" onClick={this.handleSubmit} id="submitbtn">
              {this.props.isLoading ? "Wait..." : "Add Comment"}
            </button>
          ) : (
            <button className="disabledbtn">Add Comment</button>
          )}
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    error: state.error,
    successMessage: state.successMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (postId, comment) =>
      dispatch(createComment(postId, comment)),
    fetchSinglePost: (postId) => dispatch(fetchSinglePost(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
