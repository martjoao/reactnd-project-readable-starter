import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

const Post = props => (
  <Panel>
    <Panel.Heading>
      <Panel.Title componentClass="h2">
        {props.post.title}
      </Panel.Title>
    </Panel.Heading>
    <Panel.Body>{props.post.body}</Panel.Body>
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
