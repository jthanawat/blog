import React, { Component } from 'react'
import Post from '../../../components/Post/Post'
import axios from '../../../axios'
import './Posts.css'
class Posts extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    // but trying to store them in a post constant won't work bcuz that get request happens asyncronously. it doesnt finish immedialy, it needs some time to go to the server and get the data.
    // axios uses promises
    axios.get("/posts").then((res) => {
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
    })
    // javascript doesn't wait for this to finish so if you're immediately calling this set state after get method, the data wont have been fetched yet.
    // this.setState({})
  }

  // expect to get an argument
  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });

    return (
      <div>
        <section className="Posts">{posts}</section>
      </div>
    )
  }
}

export default Posts
