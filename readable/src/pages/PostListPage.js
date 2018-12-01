import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from '../components/Post';

import { getPosts } from '../actions/postsActions';

class PostListPage extends React.PureComponent {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        {this.props.posts.map(post => (
          <Post key={post.id} post={post} />))
        }
      </div>
    );
  }
}

PostListPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => {
  const { posts, postOrder } = state.posts;
  const pagePosts = postOrder.map(id => posts[id]);

  return { posts: pagePosts };
};

const mapDispatchToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);
