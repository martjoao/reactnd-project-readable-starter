import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Pages from './pages';
import { getCategories } from './actions/categoriesActions';

import './stylesheets/App.css';
import CategoriesBar from './components/CategoriesBar';

class App extends React.PureComponent {
  componentDidMount() {
    console.log('doing it');
    this.props.getCategories();
  }

  render() {
    return (
      <div className="App">
        <CategoriesBar categories={this.props.categories} />
        <div className="content">
          {this.props.loading.toString()}
          {this.props.error.toString()}
          <Switch>
            <Route path="/:category/:id" component={Pages.PostDetailsPage} />
            <Route path="/:category" component={Pages.CategoryPage} />
            <Route exact path="/" component={Pages.DefaultPage} />
          </Switch>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
