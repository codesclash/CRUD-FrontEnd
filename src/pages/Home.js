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
    this.state = {
      page: 1,
    };
  }
  componentDidMount() {
    console.log("component mounted")
    window.addEventListener("scroll", this.handInfiniteScroll);
    this.fetchPosts();
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handInfiniteScroll);
  }

  handInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 0.05 >=
        document.documentElement.scrollHeight
    ){
      this.fetchPosts();
    }
  };
  fetchPosts(){
    console.log(this.state.page)
    this.props.fetchPosts(this.state.page);
    this.setState({ page: this.state.page + 1 });
  }


  render() {

    if (this.props.error) {
      return <Error error={this.props.error} />;
    }

    return (
      <>
        <div className="home-container">
          <Hero />
          {this.props.postData && this.props.postData.length === 0 ? (
            <div className="no-post">
              No Posts Available. Create a new post{" "}
            </div>
          ) : (
            <div className="cards">
              {this.props.postData &&
                this.props.postData
                  .map((post) => <Card key={post._id} post={post} />)}
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
    fetchPosts: (page) => dispatch(fetchPosts(page)),
    deletePost: (id) => dispatch(deletePost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
