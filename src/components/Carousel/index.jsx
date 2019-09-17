import React, { Component } from 'react';
import ArticleCard from '../ArticleCard/index.jsx';
import PropTypes from 'prop-types';
import paginator from '../../utils/paginator';
import './style.scss';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

const CarouselSections = ({ sectionItems, theme }) => {
  return sectionItems.map((articleDetails, id) => {
    return <ArticleCard key={id} theme={theme} {...articleDetails} />;
  });
};

export class CarouselContainer extends Component {
  state = {
    index: 0,
    direction: null,
    articlesCardPerCarousel: 4
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setArticleCardPerCarousel(screen.width);
    });
  }

  componentWillMount() {
    this.setArticleCardPerCarousel(screen.width);
  }

  setArticleCardPerCarousel(width) {
    let result;
    if (width >= 1308) result = 4;
    else if (width >= 983) result = 3;
    else if (width >= 667) result = 2;
    else {
      result = 1;
    }

    this.setState({ articlesCardPerCarousel: result });
  }

  setDirection(direction) {
    this.setState({
      index: direction
    });
  }

  setIndex(changeIndex) {
    this.setState({
      index: changeIndex
    });
  }

  render() {
    const { articles, category, theme } = this.props;
    const { articlesCardPerCarousel, index, direction } = this.state;

    const handleSelect = (selectedIndex, e) => {
      this.setIndex(selectedIndex);
      this.setDirection(e.direction);
    };

    const sections = paginator(articles, articlesCardPerCarousel);

    const finalSections = sections.map((sectionItems, id) => {
      return (
        <Carousel.Item key={id}>
          <section className={'customFeel'} key={id}>
            <CarouselSections
              key={id}
              theme={theme}
              sectionItems={sectionItems}
            />
          </section>
        </Carousel.Item>
      );
    });

    return (
      <div className="carousel-container mb-5 ">
        <div className="carousel-top-Label">
          <Link to="/articles" className="carousel-label">
            {category} <span className="explore-all">> explore all</span>
          </Link>
          <hr className="carousel-line" />
        </div>
        <Carousel
          indicators={false}
          activeIndex={index}
          direction={direction}
          onSelect={handleSelect}
          interval={null}
          keyboard={true}
          touch={true}
        >
          {finalSections}
        </Carousel>
      </div>
    );
  }
}

CarouselContainer.propTypes = {
  articles: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  theme: PropTypes.string
};

export default CarouselContainer;
