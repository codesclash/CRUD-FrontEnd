import React, { Component } from "react";
import "./styles/Home.css";
import { Hero } from "../components/Hero";
import "./styles/Home.css";
import Card from "../components/Card/index";
import { connect } from "react-redux";
import { fetchPosts, deletePost } from "../redux/actions/postActions";
import { Error } from "./Error";
import { Loading } from "./Loading";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchPosts();
    window.scrollTo(0, 0);
    console.log("a", this.props.postData)
  }

  render() {

    if (this.props.isLoading) {
      return <Loading />;
    }
    if (this.props.error) {
      return <Error error={this.props.error} />;
    }

    return (
      <>
        <div className="home-container">
          <Hero />
          {this.props.postData && this.props.postData.length === 0 ? (
            <div className="no-post">No Posts Available. Create a new post </div>
          ) : (
            <div className="cards">
              {this.props.postData &&
                this.props.postData
                  .reverse()
                  .map((post) => (
                    <Card
                      key={post._id}
                      post={post}
                    />
                  ))}
            </div>
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    postData: state.posts,
    isLoading: state.isLoading,
    error: state.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: (id) => dispatch(deletePost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
