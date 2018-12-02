import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Button,
  Form,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';

import FormField from './FormField';

import { setPostFormState } from '../actions/appStateActions';
import { createPost, updatePost } from '../actions/postsActions';

const INITIAL_FORM_STATE = {
  category: null,
  title: '',
  body: '',
  author: '',
};

class PostForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: { ...INITIAL_FORM_STATE },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.show && nextProps.show && nextProps.editingPost) {
      this.setState({
        form: {
          category: nextProps.editingPost.category,
          title: nextProps.editingPost.title,
          body: nextProps.editingPost.body,
          author: nextProps.editingPost.author,
        },
      });
    }
  }

  close = () => {
    this.props.setPostFormState(false);
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

  onCategoryChange = value => this.onFormFieldChange('category', value)

  onTitleChange = ({ target: { value } }) => this.onFormFieldChange('title', value)

  onBodyChange = ({ target: { value } }) => this.onFormFieldChange('body', value)

  onAuthorChange = ({ target: { value } }) => this.onFormFieldChange('author', value)

  createPost = () => {
    this.props.createPost({ ...this.state.form });
    this.close();
  };

  editPost = () => {
    this.props.updatePost(this.props.editingPost.id, {
      ...this.state.form,
    });
    this.close();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FormField
              label="Title"
              type="text"
              value={this.state.form.title}
              onChange={this.onTitleChange}
            />
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
            <FormGroup controlId="categories">
              <DropdownButton
                id="category"
                title="Category"
                bsStyle="default"
                onSelect={this.onCategoryChange}
              >
                {this.props.categories.map(category => (
                  <MenuItem
                    active={this.state.form.category === category}
                    eventKey={category}
                    key={category}
                  >
                    {category}
                  </MenuItem>
                ))}
              </DropdownButton>
              <HelpBlock>{this.state.form.category}</HelpBlock>
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <ButtonToolbar>
            <Button
              bsStyle="primary"
              onClick={this.props.editingPost ? this.editPost : this.createPost}
            >
              {this.props.editingPost ? 'Edit Post' : 'Add Post'}
            </Button>
            <Button onClick={this.close}>Close</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}

PostForm.propTypes = {
  show: PropTypes.bool,
  setPostFormState: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  editingPost: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

PostForm.defaultProps = {
  show: true,
  editingPost: null,
};

const mapStateToProps = (state) => {
  const { editingPost } = state.app;
  const { posts } = state.posts;
  const { categories } = state.categories;

  const post = posts[editingPost];
  return { editingPost: post, categories };
};

const mapDispatchToProps = {
  setPostFormState,
  createPost,
  updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
