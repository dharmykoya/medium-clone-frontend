/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './CreateArticle.scss';
import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';
import axios from 'axios';
import IconComponent from '../../components/IconComponent/index.jsx';
import { createArticle } from './createArticle.action';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export class CreateArticle extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      editorState: '',
      selectedImage: '',
      title: '',
      tags: [],
      image: []
    };
    this.tags = [];
    this.inputEl = React.createRef();
    this.tagsTooltip = [];
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleTagSubmit = this.handleSTagSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleCreateArticle = this.handleCreateArticle.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePublishArticle = this.handlePublishArticle.bind(this);
  }

  // fetch a list of tags to autosuggest.
  componentDidMount() {
    axios.get(`${process.env.BASE_URL}articles/tags`).then(res => {
      this.tags = res.data.data;
    });
  }

  // autosuggest method
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.tags.filter(
          item => item.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion.
  getSuggestionValue = suggestion => suggestion.name;

  // renders suggestion to user
  renderSuggestion = suggestion => <div>{suggestion.name}</div>;
  handleSuggestion = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // populate tags tooltips
  populateTagsTooltip(value) {
    if (value.trim() !== '') {
      // trim input and split
      this.tagsTooltip.push(value.split(','));
    }
  }
  handleEditorChange(content) {
    this.setState({ editorState: content });
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleSTagSubmit(e) {
    e.preventDefault();
    // populate tags tooltips
    this.populateTagsTooltip(this.state.value);
    // set current tags to state
    this.setState({ tags: this.tagsTooltip.flat(Infinity) });
    this.setState({ value: '' });
  }
  //  Handles the image file preview
  handleImageChange(e) {
    // get the file uploaded
    const files = e.target.files;

    //check if file exist
    if (files && files[0]) {
      // check if file type is any image format
      this.setState({ image: files[0] });
      if (!files[0].type.match(/image/)) {
        // Call alert here
        /* istanbul ignore next */

        toast.error('Please select only an image.');
        return;
      }
      // initializes file reader
      /* istanbul ignore next */
      const reader = new FileReader();
      /* istanbul ignore next */
      reader.onload = e => {
        // extract the image file and set it to state
        /* istanbul ignore next */
        this.setState({ selectedImage: e.target.result });
      };
      /* istanbul ignore next */
      reader.readAsDataURL(files[0]);
    }
  }

  handleCreateArticle(isPublish) {
    // curate all the necessary entities
    const { image, tags, editorState, title } = this.state;
    // initialize form data
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('tag', tags.toString());
    formData.append('body', editorState);

    // dispatch create article
    this.props.createArticle(formData, isPublish, this.props.history);
  }

  handlePublishArticle() {
    const publish = 'publish';
    this.handleCreateArticle(publish);
  }

  render() {
    const { value, suggestions, selectedImage, tags } = this.state;
    const { theme } = this.props.theme;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Add tags e.g UI/UX',
      value,
      onChange: this.handleSuggestion
    };
    // config for the text editor
    const EditorModules = {
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: ['Roboto', 'Poppins'] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' }
        ],
        ['link', 'image', 'video', 'code'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false
      }
    };
    return (
      <React.Fragment>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className={`col-lg-8 editor ${theme} p-5`}>
              <Input
                name="title"
                customClassName={`p-2 box-radius-0 w-100 border-right-0 border-left-0 border-top-0 border-radius-0 editor_title ${theme}`}
                placeholder="Title"
                handleChange={this.handleTitleChange}
              />
              <input
                type="file"
                ref={this.inputEl}
                className="display-hidden"
                onChange={this.handleImageChange}
                multiple
              />
              <button
                type="button"
                onClick={() => this.inputEl.current.click()}
                className="image-button"
              >
                {theme === 'dark-theme' ? (
                  <IconComponent
                    src="./../src/assets/images/camera.svg"
                    alt="camera"
                    className="pt-3"
                  />
                ) : (
                  <IconComponent
                    src="./../src/assets/images/camera-dark.svg"
                    alt="camera"
                    className="pt-3"
                  />
                )}
              </button>
              {selectedImage ? (
                <IconComponent
                  src={selectedImage ? selectedImage : ''}
                  alt="tag"
                  className="w-70 img-fluid mt-3 ml-3"
                />
              ) : (
                ''
              )}

              <ReactQuill
                className="pt-4"
                value={this.state.editorState}
                onChange={this.handleEditorChange}
                modules={EditorModules}
                placeholder="Write your story..."
              />
            </div>
            <div className={`col-lg-3 ml-lg-3 p-0`}>
              <div className={`editor_action  ${theme}   p-3 `}>
                <h5 className="pb-2 pt-2">Add Tags</h5>
                <form onSubmit={this.handleTagSubmit} className="tag_form">
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                  />
                  <Button customClassName=" add_tag_btn" buttonText="">
                    Add
                  </Button>
                </form>
                <div className="container-fluid p-2">
                  <div className="row">
                    {tags.length !== 0
                      ? tags.map((item, i) => {
                          /* istanbul ignore next */

                          return (
                            <div className="tag" key={i}>
                              {item}
                              <span
                                className="cancel-tag"
                                onClick={() => {
                                  /* istanbul ignore next */
                                  this.tagsTooltip = this.tagsTooltip
                                    .flat(Infinity)
                                    .filter(tag => tag !== item);
                                  const remTags = tags.filter(
                                    tag => tag !== item
                                  );
                                  this.setState({ tags: remTags });
                                }}
                              >
                                <IconComponent
                                  src="./../src/assets/images/cancel.svg"
                                  alt="tag"
                                />
                              </span>
                            </div>
                          );
                        })
                      : ''}
                  </div>
                </div>
                <div className="buttons text-center">
                  <Button
                    customClassName="save pr-5 pl-5 mt-5 mb-4"
                    handleclick={this.handleCreateArticle}
                  >
                    Save
                  </Button>

                  <Button
                    customClassName="publish pr-5 pl-5 mb-4"
                    handleclick={this.handlePublishArticle}
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CreateArticle.propTypes = {
  theme: propTypes.object.isRequired,
  createArticle: propTypes.func,
  createArticleProp: propTypes.object,
  history: propTypes.object
};

export const mapStateToProps = state => ({
  theme: state.theme,
  createArticleProp: state.createArticle
});

export default connect(
  mapStateToProps,
  { createArticle }
)(CreateArticle);
