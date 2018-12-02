import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Button,
  Form,
  ButtonToolbar,
} from 'react-bootstrap';

import FormField from './FormField';

import { setCommentFormState } from '../actions/appStateActions';
import { createComment } from '../actions/commentsActions';

const INITIAL_FORM_STATE = {
  body: '',
  author: '',
};

class CommentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: { ...INITIAL_FORM_STATE },
    };
  }

  close = () => {
    this.props.setCommentFormState(false);
    this.setState({ form: { ...INITIAL_FORM_STATE } });
  }

  onFormFieldChange = (formField, value) => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [formField]: value,
      },
    }));
  }

  onBodyChange = ({ target: { value } }) => this.onFormFieldChange('body', value)

  onAuthorChange = ({ target: { value } }) => this.onFormFieldChange('author', value)

  createComment = () => {
    this.props.createComment({
      body: this.state.form.body,
      author: this.state.form.author,
      parentId: this.props.commentParent,
    });
    this.close();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FormField
              label="Body"
              type="text"
              componentClass="textarea"
              value={this.state.form.body}
              onChange={this.onBodyChange}
            />
            <FormField
              label="Author"
              type="text"
              value={this.state.form.author}
              onChange={this.onAuthorChange}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.createComment}>Create</Button>
            <Button onClick={this.close}>Close</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}

CommentForm.propTypes = {
  show: PropTypes.bool,
  setCommentFormState: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  commentParent: PropTypes.string,
};

CommentForm.defaultProps = {
  show: true,
  commentParent: null,
};

const mapStateToProps = (state) => {
  const { commentParent } = state.app;
  return { commentParent };
};

const mapDispatchToProps = {
  setCommentFormState,
  createComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
