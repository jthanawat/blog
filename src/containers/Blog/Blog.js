import React, { Component } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    // but trying to store them in a post constant won't work bcuz that get request happens asyncronously. it doesnt finish immedialy, it needs some time to go to the server and get the data.
    // axios uses promises
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      this.setState({ posts: res.data });
      console.log(res);
    });
    // javascript doesn't wait for this to finish so if you're immediately calling this set state after get method, the data wont have been fetched yet.
    // this.setState({})
  }

  render() {
    const posts = this.state.posts.map((post) => {
      return <Post key={post.id} title={post.title} />;
    });

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
