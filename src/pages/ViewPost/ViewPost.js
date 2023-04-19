import React, { Component } from "react";
import "../styles/ViewPost.css";

import CommentCard from "../../components/CommentCard/index";
import AddComment from "../../components/AddComment";
import { Error } from "../Error";
import { Loading } from "../Loading";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
   
  }
  
  getPostId = () => {
    return window.location.pathname.split("/")[2];
  };

  componentDidMount() {
    this.props.toggleBtn();
    this.props.toggleEditBtn();
    this.props.fetchSinglePost(this.getPostId());
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.toggleBtn();
    this.props.toggleEditBtn();
  }

  render() {
    const { title, content, author, imgLink, datePublished } =
      this.props.singlePostData;

    if (this.props.isLoading) {
      return <Loading />;
    }
    if (this.props.error) {
      return <Error error={this.props.error} />;
    }

    return (
      <>
      <div className="main-container">
        <div ><Link to={"/"}><button className="go-back-home"> &lt; Click Here To Go To Home</button></Link></div>
        <div className="post-container">
          <div className="post-title_updatebtn">
            <h1>{title}</h1>
          </div>
          <div className="post-img">
            <img className="img" src={imgLink} alt="img" />
          </div>
          <div className="post-info">
            <h5>
              Author:<span className="info"> {author}</span>
            </h5>
            <h5>
              Date Published:
              <span className="info">
                {" "}
                {new Date(datePublished).toLocaleDateString()}
              </span>
            </h5>
          </div>
          <div className="post-content">
            <p>{content}</p>
          </div>
        </div>
        <div className="comments-container">
          <h1 ref={this.buttonRef}>Comments</h1>
          <div className="comment">
            <AddComment />
            {this.props.singlePostComment &&
              this.props.singlePostComment.map((comment) => (
                <CommentCard
                  key={comment._id}
                  postId={this.getPostId()}
                  comment={comment}
                />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer />
      </>
    );
  }
}

export default ViewPost;
