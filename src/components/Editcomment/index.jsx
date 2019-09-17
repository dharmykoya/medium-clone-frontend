import React, { Component } from 'react';
import Textarea from '../TextArea/index.jsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../ReportArticle/style.scss';

export class EditCommentForm extends Component {
  state = {
    comment: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      updateCommentRequest,
      commentId,
      slug,
      token,
      handleClose
    } = this.props;
    updateCommentRequest(slug, commentId, this.state.comment, token);
    this.setState({ comment: '' });
    handleClose();
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { lightTheme, handleClose } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h5>Update your comment</h5>

        <Textarea
          customClassName="report-textarea"
          lightTheme={lightTheme}
          placeholder="Comment"
          value={this.state.comment}
          handleChange={this.handleInputChange}
          required
          name="comment"
        />
        <button className="button button-normal report-btn">Update</button>
        <Link
          className="btn button button-inverse report-btn report-btn-close"
          to="#"
          onClick={handleClose}
        >
          Close
        </Link>
      </form>
    );
  }
}

EditCommentForm.propTypes = {
  lightTheme: PropTypes.bool,
  handleClose: PropTypes.func,
  updateCommentRequest: PropTypes.func,
  slug: PropTypes.string,
  token: PropTypes.string,
  commentId: PropTypes.any
};

export default EditCommentForm;
