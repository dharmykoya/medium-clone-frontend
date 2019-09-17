import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconComponent from '../IconComponent/index.jsx';
import TablistContainer from '../TablistContainer/index.jsx';
import './ArticleTabList.scss';

/**
 *  Sample Usage
 *  
 * const props = {
  lightTheme: true,
  articleTitle: 'Understanding redux and react',
  articleDescription: 'Redux the best storage system',
  publishedAt: 'July 28',
  readTime: '6 mins',
  numberLikes: 120,
  numberComment: 70
};
 *  <ArticleTabList {...props} />
 */
const articleCardList = props => {
  const URL = `articles/${props.slug}`;
  return (
    <TablistContainer lightTheme={props.lightTheme}>
      <div className="row article-tab-list" id={props.slug}>
        <div className="col-md-4 col-sm-12 article-tab-list-image">
          <img
            src={
              props.imageObj[0]
                ? props.imageObj[0]
                : 'http://www.wi65.org/wp-content/themes/joyn/images/default-thumb.png'
            }
            className="image-fluid"
            alt="article"
          />
        </div>

        <div className="col-md-8 col-sm-6 article-tab-list-main-body">
          <div className="row body-cover">
            <div className="col-md-12 col-sm-12 article-tab-list-body">
              <h3>
                <Link to={URL}>{props.title}</Link>
              </h3>
              <h5>{props.description}</h5>
              <small>
                {props.datePublished} - {props.readTime} read
              </small>
            </div>

            <div className="row col-md-12 article-tablist-second">
              <div className="col-md-4 article-tab-list-icon">
                <div>
                  <IconComponent
                    src={'../src/assets/images/like.svg'}
                    alt={'image asset'}
                    className={'icon-small'}
                  />
                  <span>28</span>
                </div>

                <div className="article-tab-list-comment">
                  <IconComponent
                    src={'../src/assets/images/comment.svg'}
                    alt={'image asset'}
                    className={'icon-small'}
                  />
                  <span>65</span>
                </div>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4 article-tab-list-action">
                <input
                  type="submit"
                  /* istanbul ignore next */
                  onClick={() => props.handleShow(props.slug)}
                  value={props.actionButton}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TablistContainer>
  );
};

articleCardList.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  lightTheme: PropTypes.bool,
  numberComment: PropTypes.number,
  numberLikes: PropTypes.number,
  datePublished: PropTypes.string,
  readTime: PropTypes.string,
  description: PropTypes.string,
  actionButton: PropTypes.string,
  unpublishArticle: PropTypes.func,
  toggleModal: PropTypes.func,
  handleShow: PropTypes.func,
  imageObj: PropTypes.object
};

export default articleCardList;
