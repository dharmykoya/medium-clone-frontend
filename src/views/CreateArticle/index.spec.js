jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import { mount, configure, shallow } from 'enzyme';
import createArticleReducer from './createArticle.reducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {
  createArticle,
  createArticleStart,
  createArticleFail
} from './createArticle.action';
import { CreateArticle, mapStateToProps } from './index.jsx';
import {
  CREATE_ARTICLE_FAIL,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_START
} from '../../actionTypes/index';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

const data = {
  title: 'Design pattern',
  body: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
  tags: 'design, pattern, create web app',
  image:
    'https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg'
};

const response = {
  data: {
    status: 'success',
    data: {}
  }
};

describe('Create Article Page', () => {
  describe('CreateArticle Actions', () => {
    it('dispatches createArticleStart action', done => {
      const expectedActions = [{ type: 'CREATE_ARTICLE_START' }];

      store.dispatch(createArticleStart());

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches createArticleFail action', done => {
      const expectedActions = [
        { type: 'CREATE_ARTICLE_START' },
        { type: 'CREATE_ARTICLE_FAIL', payload: undefined }
      ];

      store.dispatch(createArticleFail());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches createArticle action', () => {
      const expectedActions = [
        { type: 'CREATE_ARTICLE_START' },
        {
          type: 'CREATE_ARTICLE_SUCCESS',
          payload: response.data
        }
      ];

      store = mockStore({});
      store.dispatch(createArticle(data, false)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('dispatches publishArticle action', done => {
      const expectedActions = [
        { type: 'CREATE_ARTICLE_START' },
        {
          type: 'CREATE_ARTICLE_SUCCESS',
          payload: response.data
        }
      ];

      store = mockStore({});
      store.dispatch(createArticle(data, true)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  });

  describe('Create Article Reducers', () => {
    const initialState = {
      loading: false,
      error: null,
      success: {}
    };

    it('Should return default state', () => {
      const newState = createArticleReducer(undefined, {});
      expect(newState).toEqual(initialState);
    });

    it('Should return a new state if it receives CREATE_ARTICLE_START in action type', () => {
      const state = {
        loading: true,
        error: null,
        success: {}
      };
      const newState = createArticleReducer(initialState, {
        type: CREATE_ARTICLE_START
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it receives CREATE_ARTICLE_SUCCESS in action type', () => {
      const state = {
        loading: false,
        error: null,
        success: undefined
      };
      const newState = createArticleReducer(initialState, {
        type: CREATE_ARTICLE_SUCCESS
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it receives CREATE_ARTICLE_FAIL in action type', () => {
      const state = {
        loading: false,
        error: undefined,
        success: {}
      };
      const newState = createArticleReducer(initialState, {
        type: CREATE_ARTICLE_FAIL
      });
      expect(newState).toEqual(state);
    });
  });

  describe('Create Article Page', () => {
    const defaultProps = {
      theme: {},
      createArticle: jest.fn(),
      handleImageChange: jest.fn(),
      getSuggestions: jest.fn()
    };

    const state = {
      value: '',
      suggestions: [],
      editorState: '',
      selectedImage: '',
      title: '',
      tags: [],
      image: []
    };

    const wrapper = shallow(<CreateArticle {...defaultProps} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleEditorChange');
    instance.tagsTooltip = ['php', 'try'];
    instance.tagsTooltip.flat = jest.fn();

    it('renders the create article component correctly', () => {
      const wrapper = shallow(<CreateArticle {...defaultProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render component successfully and check form interactions', () => {
      const component = mount(
        <BrowserRouter>
          <CreateArticle {...defaultProps} />
        </BrowserRouter>
      );
      const instance = component.instance();
      instance.createArticle = jest.fn(data, false);
      component.find('.save').simulate('click');
    });

    it('should render component successfully and check form interactions', () => {
      const component = mount(
        <BrowserRouter>
          <CreateArticle {...defaultProps} {...state} />
        </BrowserRouter>
      );
      const spy = jest.spyOn(instance, 'handleCreateArticle');
      spy(true);
      component.update();
      component.find('.publish').simulate('click');
      expect(instance.handleCreateArticle).toHaveBeenCalled();
    });

    it('should render add tag form successfully and check form interactions', () => {
      const component = mount(
        <BrowserRouter>
          <CreateArticle {...defaultProps} {...state} />
        </BrowserRouter>
      );
      component.find('.add_tag_btn').simulate('submit');
    });

    it('should render component successfully and check form interactions', () => {
      const component = mount(
        <BrowserRouter>
          <CreateArticle {...defaultProps} />
        </BrowserRouter>
      );
      const instance = component.instance();
      instance.tagsTooltip = ['php', 'try'];
      instance.tagsTooltip.flat = jest.fn();
      component.find('.tag_form').simulate('submit');
    });

    it('should render component successfully and check form interactions', () => {
      const component = mount(
        <BrowserRouter>
          <CreateArticle {...defaultProps} />
        </BrowserRouter>
      );
      const instance = component.instance();
      instance.tagsTooltip = ['php', 'try'];
      instance.handleSuggestion = jest.fn();
      jest.spyOn(instance, 'handleSuggestion');
      instance.handleSuggestion({});
      instance.setState({ value: 'design' });
      instance.setState({ suggestions: 'design' });
      expect(instance.handleSuggestion).toHaveBeenCalled();
    });

    it('should render title form successfully and check form interactions', () => {
      const event = {
        preventDefault() {},
        target: {
          name: 'title',
          value: 'design patterns'
        }
      };
      const component = mount(
        <BrowserRouter>
          <CreateArticle {...defaultProps} />
        </BrowserRouter>
      );
      const inputTag = component.find('input').at(0);
      inputTag.simulate('change', event);
    });

    it('should render image input form successfully and check form interactions', () => {
      const event = {
        preventDefault() {},
        target: {
          files: []
        }
      };
      const component = mount(
        <BrowserRouter>
          <CreateArticle {...defaultProps} />
        </BrowserRouter>
      );
      const inputTag = component.find('input').at(1);
      inputTag.simulate('change', event);
    });

    it('should render image button form successfully and check form interactions', () => {
      const component = mount(
        <BrowserRouter>
          <CreateArticle {...defaultProps} />
        </BrowserRouter>
      );
      component.find('.image-button').simulate('click');
    });

    it('should render react quill input form successfully and check form interactions', () => {
      const event = {
        preventDefault() {},
        target: {
          name: 'title',
          value: 'design patterns'
        }
      };
      const component = mount(
        <BrowserRouter>
          <CreateArticle {...defaultProps} {...state} />
        </BrowserRouter>
      );

      component.setState({ tags: ['php', 'try'] });
      const inputTag = component.find('input').at(2);
      inputTag.simulate('change', event);
    });

    it('should render getSuggestions method', () => {
      const component = shallow(<CreateArticle {...defaultProps} />);
      const instance = component.instance();
      jest.spyOn(instance, 'getSuggestions');
      instance.tags = [{ name: 'old' }];
      instance.getSuggestions('new');
      expect(instance.getSuggestions).toHaveBeenCalled();
    });

    it('should render getSuggestions method', () => {
      const component = shallow(<CreateArticle {...defaultProps} />);
      const instance = component.instance();
      jest.spyOn(instance, 'populateTagsTooltip');
      instance.populateTagsTooltip('some text');
      expect(instance.populateTagsTooltip).toHaveBeenCalled();
    });

    it('should render getSuggestions method', () => {
      const component = shallow(<CreateArticle {...defaultProps} />);
      const instance = component.instance();
      jest.spyOn(instance, 'onSuggestionsClearRequested');
      instance.onSuggestionsClearRequested();
      expect(instance.onSuggestionsClearRequested).toHaveBeenCalled();
    });

    // onSuggestionsFetchRequested

    it('should render getSuggestions method', () => {
      const component = shallow(<CreateArticle {...defaultProps} />);
      const instance = component.instance();
      jest.spyOn(instance, 'onSuggestionsFetchRequested');
      instance.onSuggestionsFetchRequested({ value: '' });
      expect(instance.onSuggestionsFetchRequested).toHaveBeenCalled();
    });

    it('should render getSuggestions method', () => {
      const component = shallow(<CreateArticle {...defaultProps} />);
      const instance = component.instance();
      jest.spyOn(instance, 'handleEditorChange');
      instance.handleEditorChange('some text');
      expect(instance.handleEditorChange).toHaveBeenCalled();
    });

    it('should render getSuggestions method', () => {
      const component = shallow(<CreateArticle {...defaultProps} />);
      const instance = component.instance();
      jest.spyOn(instance, 'handleTitleChange');
      instance.handleTitleChange({ target: { value: 'some text' } });
      expect(instance.handleTitleChange).toHaveBeenCalled();
    });

    it('should render getSuggestions method', () => {
      const file = {
        lastModified: 1564061403721,
        lastModifiedDate: {},
        name: '2.jpg',
        size: 356795,
        type: 'image/jpeg'
      };
      const blob = new Blob([JSON.stringify(file)], {
        type: 'application/json'
      });
      const event = {
        preventDefault() {},
        target: {
          files: [blob]
        }
      };
      const component = shallow(<CreateArticle {...defaultProps} />);
      const instance = component.instance();
      jest.spyOn(instance, 'handleImageChange');
      instance.handleImageChange(event);
      expect(instance.handleImageChange).toHaveBeenCalled();
    });

    it('should render getSuggestions method', () => {
      const file = {
        lastModified: 1564061403721,
        lastModifiedDate: {},
        name: '2.jpg',
        size: 356795,
        type: ''
      };
      const blob = new Blob([JSON.stringify(file)], {
        type: 'application/json'
      });
      const event = {
        preventDefault() {},
        target: {
          files: [blob]
        }
      };
      const component = shallow(<CreateArticle {...defaultProps} />);
      const instance = component.instance();
      jest.spyOn(instance, 'handleImageChange');
      instance.handleImageChange(event);
      expect(instance.handleImageChange).toHaveBeenCalled();
    });

    it('should render with initial dispatch state', done => {
      const initialState = {};
      expect(mapStateToProps(initialState).theme).toEqual(undefined);
      expect(mapStateToProps(initialState).createArticleProp).toEqual(
        undefined
      );
      done();
    });
  });
});
