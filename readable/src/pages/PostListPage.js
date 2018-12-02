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
    console.log(this.props);
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

const mapStateToProps = (state, ownProps) => {
  const { posts, postOrder } = state.posts;
  let pagePosts = postOrder.map(id => posts[id]);

  const { category } = ownProps.match.params;
  if (category) {
    pagePosts = pagePosts.filter(post => post.category === category);
  }


  return { posts: pagePosts };
};

const mapDispatchToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);
