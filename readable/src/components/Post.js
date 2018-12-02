import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { voteOnPost, deletePost } from '../actions/postsActions';
import { setPostFormState } from '../actions/appStateActions';

import '../stylesheets/InfoCard.css';
import arrowUpIcon from '../assets/img/up-arrow.png';
import arrowDownIcon from '../assets/img/down-arrow.png';

const Post = props => (
  <Panel bsStyle="primary">
    <Panel.Heading>
      <div className="infocard-header-content">
        <div className="infocard-header-title-container">
          <Panel.Title componentClass="h2">
            {props.post.title}
          </Panel.Title>
        </div>
        <ButtonToolbar>
          <Button
            bsStyle="warning"
            onClick={() => props.setPostFormState(true, props.post.id)}
          >
            Edit
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => {
              props.deletePost(props.post.id);
              props.history.push('/');
            }}
          >
            Delete
          </Button>
        </ButtonToolbar>

      </div>
    </Panel.Heading>
    <Panel.Body>
      <div className="infocard-content">
        <div className="infocard-body">
          {props.full ? props.post.body
            : (
              <div>
                Click
                <Link to={`/${props.post.category}/${props.post.id}`}>
                  {' here '}
                </Link>
                to view more
              </div>
            )
          }
        </div>
        <div className="infocard-vote-controls">
          <button
            type="button"
            onClick={() => props.voteOnPost(props.post.id)}
          >
            <img src={arrowUpIcon} width="16" alt="upvote" />
          </button>
          <span>{props.post.voteScore}</span>

          <button
            type="button"
            onClick={() => props.voteOnPost(props.post.id, false)}
          >
            <img src={arrowDownIcon} width="16" alt="downvote" />
          </button>

        </div>
      </div>
    </Panel.Body>
    <Panel.Footer>
      <div className="infocard-footer-content">
        <div>{`Posted by ${props.post.author}`}</div>
        {!props.full && <div>{`${props.post.commentCount} comment(s)`}</div>}
      </div>
    </Panel.Footer>
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
  voteOnPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  setPostFormState: PropTypes.func.isRequired,
  full: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Post.defaultProps = {
  full: false,
};

const mapDispatchToProps = {
  voteOnPost,
  deletePost,
  setPostFormState,
};

export default withRouter(connect(null, mapDispatchToProps)(Post));
