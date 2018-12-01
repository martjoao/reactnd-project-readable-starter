import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Pages from './pages';
import { getCategories } from './actions/categoriesActions';

import './App.css';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="App">
        {this.props.loading.toString()}
        {this.props.error.toString()}
        {this.props.categories}
        <Switch>
          <Route exact path="/" component={Pages.DefaultPage} />
          <Route path="/:category/:id" component={Pages.PostDetailsPage} />
          <Route path="/:category" component={Pages.CategoryPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  getCategories: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => {
  const { loading, error, categories } = state.categories;
  return { loading, error, categories };
};

const mapDispatchToProps = {
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
