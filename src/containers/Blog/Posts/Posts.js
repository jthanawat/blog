import React, { Component } from "react";
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
// import { Link } from "react-router-dom";
import "./Posts.css";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";
class Posts extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    // but trying to store them in a post constant won't work bcuz that get request happens asyncronously. it doesnt finish immedialy, it needs some time to go to the server and get the data.
    // axios uses promises
    console.log(this.props);
    axios
      .get("/posts")
      .then((res) => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          };
        });
        this.setState({ posts: updatedPosts });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        // this.setState({error: true})
      });
    // javascript doesn't wait for this to finish so if you're immediately calling this set state after get method, the data wont have been fetched yet.
    // this.setState({})
  }

  // expect to get an argument
  postSelectedHandler = (id) => {
    // this.setState({ selectedPostId: id });
    // this.props.history.push({pathname: '/posts/' + id});
    this.props.history.push("/posts/" + id);
  };

  render() {
    console.log(this.props)
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // <Link to={'/posts/' + post.id} >
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            // {...this.props}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + '/:id'}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
