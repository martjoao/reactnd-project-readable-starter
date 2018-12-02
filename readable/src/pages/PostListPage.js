import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import Post from '../components/Post';

import { getPosts, setSortOrder } from '../actions/postsActions';
import { compareAsc, compareDesc } from '../utils/comparators';

import '../stylesheets/PostListPage.css';

const SORT_BY_OPTIONS = [
  'author',
  'commentCount',
  'timestamp',
  'title',
  'voteScore',
];

const SORT_ORDER_OPTIONS = ['asc', 'desc'];

class PostListPage extends React.PureComponent {
  componentDidMount() {
    this.props.getPosts();
  }

  renderSortByDropdownButton() {
    return (
      <DropdownButton
        id="sort-by"
        title="Sort By"
        onSelect={item => this.props.setSortOrder(item, null)}
      >
        {SORT_BY_OPTIONS.map(item => (
          <MenuItem
            active={this.props.sortBy === item}
            eventKey={item}
            key={item}
          >
            {item}
          </MenuItem>
        ))}
      </DropdownButton>
    );
  }

  renderSortOrderDropdownButton() {
    return (
      <DropdownButton
        id="sort-order"
        title="Sort Order"
        onSelect={item => this.props.setSortOrder(null, item)}
      >
        {SORT_ORDER_OPTIONS.map(item => (
          <MenuItem
            active={this.props.sortOrder === item}
            eventKey={item}
            key={item}
          >
            {item}
          </MenuItem>
        ))}
      </DropdownButton>
    );
  }


  render() {
    return (
      <div className="App">
        <div className="post-list-controls">
          <div><br /></div>
          <div className="post-list-sorter-container">
            <div>
              {this.renderSortByDropdownButton()}
            </div>
            <div>
              {this.renderSortOrderDropdownButton()}
            </div>
          </div>
        </div>

        {this.props.posts.map(post => (
          <Post key={post.id} post={post} />))
        }
      </div>
    );
  }
}

PostListPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const {
    posts,
    postOrder,
    sortBy,
    sortOrder,
  } = state.posts;

  let pagePosts = postOrder.map(id => posts[id]);

  const { category } = ownProps.match.params;
  if (category) {
    pagePosts = pagePosts.filter(post => post.category === category);
  }

  pagePosts.sort((a, b) => {
    if (sortOrder === 'desc') {
      return compareDesc(a[sortBy], b[sortBy]);
    }
    return compareAsc(a[sortBy], b[sortBy]);
  });

  return { posts: pagePosts, sortBy, sortOrder };
};

const mapDispatchToProps = {
  getPosts,
  setSortOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);
