import React, { Component } from 'react';
import Textarea from '../TextArea/index.jsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.scss';

class ReportArticleForm extends Component {
  state = {
    reason: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    const { reportArticleRequest, slug, token, handleClose } = this.props;
    const reason = { reason: this.state.reason };
    reportArticleRequest(slug, reason, token);
    this.setState({ reason: '' });
    handleClose();
  };

  handleInputChange = event => {
    this.setState({ reason: event.target.value });
  };

  render() {
    const { lightTheme, handleClose } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h5>
          Help us understand the problem. What is going on with this Article?
        </h5>

        <Textarea
          customClassName="report-textarea"
          lightTheme={lightTheme}
          placeholder="Reason"
          value={this.state.reason}
          handleChange={this.handleInputChange}
          required
          name="reason"
        />
        <button className="button button-normal report-btn">Report</button>
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

ReportArticleForm.propTypes = {
  lightTheme: PropTypes.bool,
  handleClose: PropTypes.func,
  reportArticleRequest: PropTypes.func,
  slug: PropTypes.string,
  token: PropTypes.string
};

export default ReportArticleForm;
