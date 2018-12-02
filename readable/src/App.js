import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Pages from './pages';
import { getCategories } from './actions/categoriesActions';

import './stylesheets/App.css';
import CategoriesBar from './components/CategoriesBar';
import CommentForm from './components/CommentForm';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="App">
        <CategoriesBar categories={this.props.categories} />
        <div className="content">
          <Switch>
            <Route path="/:category/:id" component={Pages.PostDetailsPage} />
            <Route path="/:category" component={Pages.PostListPage} />
            <Route exact path="/" component={Pages.PostListPage} />
          </Switch>
        </div>
        <CommentForm show={this.props.showCommentForm} />
      </div>
    );
  }
}

App.propTypes = {
  getCategories: PropTypes.func.isRequired,
  // loading: PropTypes.bool.isRequired,
  // error: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  showCommentForm: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { loading, error, categories } = state.categories;
  const { showPostForm, showCommentForm } = state.app;

  return {
    loading,
    error,
    categories,
    showPostForm,
    showCommentForm,
  };
};

const mapDispatchToProps = {
  getCategories,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
