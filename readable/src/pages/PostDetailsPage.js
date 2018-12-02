import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import Post from '../components/Post';
import Comment from '../components/Comment';

import { setCommentFormState } from '../actions/appStateActions';
import { getPosts } from '../actions/postsActions';
import { getComments } from '../actions/commentsActions';
import { compareDesc } from '../utils/comparators';

import '../stylesheets/PostDetailsPage.css';

class PostDetailsPage extends React.PureComponent {
  componentDidMount() {
    if (!this.props.post) {
      this.props.getPosts();
    } else {
      this.props.getComments(this.props.post.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.post && this.props.post) {
      this.props.getComments(this.props.post.id);
    }
  }

  showCreateCommentModal = () => {
    this.props.setCommentFormState(true, this.props.post.id);
  }

  render() {
    return (
      <div className="App">
        {this.props.post && <Post post={this.props.post} full />}
        <div className="post-details-comments-container">
          <div className="post-details-comments-header">
            <h4>{`Comments (${this.props.comments && this.props.comments.length})`}</h4>
            <Button bsStyle="primary" onClick={this.showCreateCommentModal}>Add Comment</Button>
          </div>
          {this.props.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />))
          }
        </div>
      </div>
    );
  }
}

PostDetailsPage.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    commentCount: PropTypes.number,
  }),
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  getComments: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  setCommentFormState: PropTypes.func.isRequired,
};

PostDetailsPage.defaultProps = {
  post: undefined,
};


const mapStateToProps = (state, ownProps) => {
  const { posts } = state.posts;
  const { id } = ownProps.match.params;
  const { comments } = state.comments;

  const post = posts[id];
  const commentsArray = Object.keys(comments)
    .map(commentId => comments[commentId])
    .filter(comment => comment.parentId === post.id)
    .sort((a, b) => compareDesc(a.timestamp, b.timestamp));

  return { post, comments: commentsArray };
};

const mapDispatchToProps = {
  getComments,
  getPosts,
  setCommentFormState,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsPage);
