import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomePage.scss';
import IconComponent from '../../components/IconComponent/index.jsx';
import { searchByTitleRequest } from '../AllArticlesPage/index.action';
import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';
import Carousel from '../../components/Carousel/index.jsx';
import LoadingIndicator from '../../components/LoadingIndicator/index.jsx';
import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export class HomePage extends Component {
  state = {
    technologyArticles: [],
    startupArticles: [],
    productDesignArticles: [],
    isLoading: false
  };
  componentDidMount() {
    this.fetchArticles();
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.searchByTitleRequest(event.target.search.value);
    this.props.history.push('/articles');
  };

  fetchArticles = async () => {
    this.setState({ isLoading: true });
    const responseTechnology = await axios.get(
      `${process.env.BASE_URL}search?tag=technology`
    );
    const responseStartup = await axios.get(
      `${process.env.BASE_URL}search?tag=startup`
    );
    const responseProductDesign = await axios.get(
      `${process.env.BASE_URL}search?tag=product`
    );
    this.setState({
      technologyArticles: responseTechnology.data.data.searchResult.reverse()
    });
    this.setState({
      startupArticles: responseStartup.data.data.searchResult.reverse()
    });
    this.setState({
      productDesignArticles: responseProductDesign.data.data.searchResult.reverse()
    });
    this.setState({ isLoading: false });
  };

  render() {
    const {
      technologyArticles,
      startupArticles,
      productDesignArticles,
      isLoading
    } = this.state;
    const { theme } = this.props.theme;
    return (
      <React.Fragment>
        <div className={`${theme} hero`}>
          <div className="container pt-2 pt-lg-5 pb-lg-5">
            <div className="row pt-2">
              <div className="col-md-6 pt-2 pt-lg-5 pr-4 pl-md-0 pl-3">
                <h1 className="font-weight-bolder text-left">
                  A platform for all best tech articles and resources
                </h1>
                <p className="lead font-weight-lighter pt-2 pt-md-4 pb-2 pb-md-4 pr-md-5">
                  Seamless, Efficient and Simple. This is a kind of Netflix for
                  your career in technology
                </p>
                <Link
                  to="/articles"
                  className="btn-hero border-0 pr-5 pl-5 pt-2 pb-2"
                >
                  Explore
                </Link>
              </div>
              <div className="col-md-6 pt-md-3 pl-5 pr-0 hidden-sm-down">
                <IconComponent
                  src="./../src/assets/images/Groupillustrator.svg"
                  alt="illustrator"
                  className="img-fluid"
                ></IconComponent>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-2 pb-3">
          <div className="row">
            <div className="col-md-12 pt-5 text-center">
              <h2 className="font-weight-light">
                Find the best resources on tech related articles
              </h2>
            </div>
            <div className="col-md-12 text-center pt-2 pb-5">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <Input
                    customClassName="mx-auto w-60 pt-2 pb-2 bg-white search-input"
                    placeholder="Search e.g Getting with Reactjs and Redux"
                    name="search"
                    required
                  />
                  <Button customClassName="search_btn pr-5 pl-5 mb-1">
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-2 pb-3">
          {isLoading ? (
            <div className="container mx-auto">
              <div className="col-md-12 center pt-4 pb-5">
                <LoadingIndicator />{' '}
              </div>
            </div>
          ) : (
            <div>
              <Carousel
                theme={theme}
                category="technology"
                articles={technologyArticles}
              />
              <Carousel
                theme={theme}
                category="Startups"
                articles={startupArticles}
              />
              <Carousel
                theme={theme}
                category="Product Design"
                articles={productDesignArticles}
              />{' '}
            </div>
          )}
        </div>
        <div className="container-fluid">
          <div className="row ">
            <div className="col-md-12 text-center mb-5 pb-4 mt-3">
              <Link
                to="/articles"
                className="font-weight-light more_btn btn-hero border-0 btn-hero border-0 pr-4 pl-4 pt-3 pb-3"
              >
                Do you want more?
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  theme: PropTypes.object,
  searchByTitleRequest: PropTypes.func,
  history: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  searchByTitleRequest: async searchValue =>
    dispatch(await searchByTitleRequest(searchValue))
});

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
