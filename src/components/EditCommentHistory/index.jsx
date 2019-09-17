import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';
import Loader from '../LoadingIndicator/index.jsx';

export class EditCommentHistory extends Component {
  render() {
    const { commentHistory, isLoading, lightTheme } = this.props;
    const additionalClass = lightTheme ? 'comment-body-light' : '';
    const historyList = isLoading ? (
      <Loader />
    ) : commentHistory &&
      commentHistory.history &&
      Object.keys(commentHistory.history.commentEditHistory).length > 1 ? (
      Object.entries(commentHistory.history.commentEditHistory).map(
        (comment, i) => {
          return (
            <div key={i} className={`comment-body ${additionalClass}`}>
              <span className={'w-100 d-block p-2'}>{comment[1]}</span>
              <span className={'w-100 d-block time-stamp text-right p-1'}>
                {moment(comment[0]).format('MMMM Do, YYYY, h:mm:ss a')}
              </span>
            </div>
          );
        }
      )
    ) : (
      <h5 className="pt-5 text-center">This comment has no edit history</h5>
    );
    return (
      <>
        <div className="comment-edit-history">{historyList}</div>
      </>
    );
  }
}

EditCommentHistory.propTypes = {
  lightTheme: PropTypes.bool,
  commentHistory: PropTypes.object,
  slug: PropTypes.string,
  token: PropTypes.string,
  commentId: PropTypes.any,
  isLoading: PropTypes.bool
};

export default EditCommentHistory;
