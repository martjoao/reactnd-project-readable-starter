import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';

import { voteOnComment, deleteComment } from '../actions/commentsActions';
import { setCommentFormState } from '../actions/appStateActions';

import '../stylesheets/InfoCard.css';
import arrowUpIcon from '../assets/img/up-arrow.png';
import arrowDownIcon from '../assets/img/down-arrow.png';

const Comment = props => (
  <Panel bsStyle="info">
    <Panel.Heading>
      <div className="infocard-header-content">
        <div className="infocard-header-title-container">
          <div>{`Posted by ${props.comment.author}`}</div>
        </div>
        <ButtonToolbar>
          <Button
            bsStyle="warning"
            onClick={() => props.setCommentFormState(true, null, props.comment.id)}
          >
            Edit
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => props.deleteComment(props.comment.id)}
          >
            Delete
          </Button>
        </ButtonToolbar>
      </div>
    </Panel.Heading>
    <Panel.Body>
      <div className="infocard-content">
        <div className="infocard-body">
          {props.comment.body}
        </div>
        <div className="infocard-vote-controls">
          <button
            type="button"
            onClick={() => props.voteOnComment(props.comment.id)}
          >
            <img src={arrowUpIcon} width="16" alt="upvote" />
          </button>
          <span>{props.comment.voteScore}</span>

          <button
            type="button"
            onClick={() => props.voteOnComment(props.comment.id, false)}
          >
            <img src={arrowDownIcon} width="16" alt="downvote" />
          </button>

        </div>
      </div>
    </Panel.Body>
  </Panel>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string,
    timestamp: PropTypes.number,
    voteScore: PropTypes.number,
  }).isRequired,
  voteOnComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  setCommentFormState: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  voteOnComment,
  deleteComment,
  setCommentFormState,
};

export default connect(null, mapDispatchToProps)(Comment);
