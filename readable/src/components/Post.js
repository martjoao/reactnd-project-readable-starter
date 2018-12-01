import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import '../stylesheets/Post.css';
import arrowUpIcon from '../assets/img/up-arrow.png';
import arrowDownIcon from '../assets/img/down-arrow.png';

const upvotePost = postId => console.log(postId);

const Post = props => (
  <Panel>
    <Panel.Heading>
      <Panel.Title componentClass="h2">
        {props.post.title}
      </Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      <div className="post-content">
        <div className="post-body">
          {props.post.body}
        </div>
        <div className="post-vote-controls">
          <button type="button" onClick={() => upvotePost(props.post.id)}>
            <img src={arrowUpIcon} width="16" alt="upvote" />
          </button>
          <span>{props.post.voteScore}</span>

          <button type="button" onClick={() => upvotePost(props.post.id)}>
            <img src={arrowDownIcon} width="16" alt="downvote" />
          </button>

        </div>
      </div>
    </Panel.Body>
    <Panel.Footer>{`Posted by ${props.post.author}`}</Panel.Footer>
  </Panel>
);

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    commentCount: PropTypes.number,
    id: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.number,
  }).isRequired,
};

Post.defaultProps = {
};

export default Post;
