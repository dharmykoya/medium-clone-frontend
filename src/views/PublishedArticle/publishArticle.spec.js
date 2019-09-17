jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import moxios from 'moxios';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import publishArticleReducer from './publishedArticle.reducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {
  getPublishedArticlesStart,
  getPublishedArticlesSuccess,
  getPublishedArticles,
  unpublishArticle,
  unpublishArticleSuccess,
  errorResponse
} from './publishedArticle.action';
import { PublishedArticle, mapDispatchToProps } from './index.jsx';
import {
  GET_PUBLISHED_ARTICLES_START,
  GET_PUBLISHED_ARTICLES_SUCCESS,
  UNPUBLISHED_ARTICLES_SUCCESS,
  ERROR_RESPONSE_ON_ARTICLE
} from '../../actionTypes/index';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

const response = {
  status: 'success',
  data: [
    {
      id: 3,
      title: 'How to build high performance teams',
      userId: 5,
      description: null,
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam, vitae interdum justo volutpat. Mauris rhoncus ante et est dignissim, at mollis est ullamcorper. Donec sapien ipsum, facilisis a leo in, bibendum feugiat sapien. Nullam non augue ut leo lobortis consectetur at a elit. Quisque pretium mauris luctus mi lacinia auctor. Mauris sodales ultricies dolor, id gravida nibh scelerisque sed. Sed elementum, diam nec mattis maximus, massa massa mattis ipsum, quis venenatis elit massa eget velit. Nam finibus fermentum mauris, nec tristique sem. Aenean ac feugiat nisi. Nulla pellentesque velit nec rutrum lobortis.\n\nPellentesque varius urna eu justo aliquet, nec facilisis enim posuere. Curabitur porta lectus in erat egestas cursus. Nam eu aliquam nibh, euismod imperdiet nisl. Aenean porta quis odio vitae hendrerit. Duis at suscipit est, quis semper erat. Aenean finibus at diam sed tristique. Maecenas nec dolor eget est pulvinar varius. Donec aliquam ligula et ipsum ultricies pretium. Duis pulvinar non lacus sit amet lacinia.\n\nVestibulum cursus nulla nec nisi consequat pretium. Nunc et vulpinterdum diam vel nunc laoreet, eget accumsan lacus efficitur. Phasellus vulputate malesuada lectus eu suscipit. Donec sagittis blandit elit eu placerat. Vivamus non lorem hendrerit, maximus dui in, mattis nibh. Cras lobortis augue id rutrum viverra. Suspendisse potenti. Vestibulum mollis urna eget sem scelerisque finibus. Nullam est felis, sagittis et ante sed, vehicula rhoncus tortor. Duis ligula lacus, rutrum a ex vitae, convallis facilisis magna.\n\nNulla at ante quis lectus elementum tincidunt. In vestibulum erat dolor, facilisis pharetra orci porttitor molestie. Vestibulum cursus nibh sit amet risus aliquet scelerisque. Praesent sed velit dictum, ultrices metus hendrerit, volutpat sem. Ut vel tincidunt ante. Donec in dolor et dui tincidunt fermentum. Mauris sit amet nisl ipsum.\n\nPhasellus aliquam orci leo, a ornare ipsum pulvinar ut. Pellentesque non pellentesque lacus, quis luctus augue. Cras vulputate at nibh et volutpat. Vivamus aliquet sit amet massa id fermentum. Vestibulum lobortis metus quis tellus euismod laoreet vel laoreet enim. Duis at dolor ut mauris venenatis dictum ac eu diam. Nunc vitae turpis eu quam imperdiet luctus.\n\nVivamus tempus, nisl sit amet suscipit aliquam, mi odio vulputate sem, ac fermentum sapijusto volutpat. Mauris rhoncus ante et est dignissim, at mollis est ullamcorper. Donec sapien ipsum, facilisis a leo in, bibendum feugiat sapien. Nullam non augue ut leo lobortis consectetur at a elit. Quisque pretium mauris luctus mi lacinia auctor. Mauris sodales ultricies dolor, id gravida nibh scelerisque sed. Sed elementum, diam nec mattis maximus, massa massa mattis ipsum, quis venenatis elit massa eget velit. Nam finibus fermentum mauris, nec tristique sem. Aenean ac feugiat nisi. Nulla pellentesque velit nec rutrum lobortis.\n\nPellentesque varius urna eu justo aliquet, nec facilisis enim posuere. Curabitur porta lectus in erat egestas cursus. Nam eu aliquam nibh, euismod imperdiet nisl. Aenean porta quis odio vitae hendrerit. Duis at suscipit est, quis semper erat. Aenean finibus at diam sed tristique. Maecenas nec dolor eget est pulvinar varius. Donec aliquam ligula et ipsum ultricies pretium. Duis pulvinar non lacus sit amet lacinia.\n\nVestibulum cursus nulla nec nisi consequat pretium. Nunc et vulpinterdum diam vel nunc laoreet, eget accumsan lacus efficitur. Phasellus vulputate malesuada lectus eu suscipit. Donec sagittis blandit elit eu placerat. Vivamus non lorem hendrerit, maximus dui in, mattis nibh. Cras lobortis augue id rutrum viverra. Suspendisse potenti. Vestibulum mollis urna eget sem scelerisque finibus. Nullam est felis, sagittis et ante sed, vehicula rhoncus tortor. Duis ligula lacus, rutrum a ex vitae, convallis facilisis magna.\n\nNulla at ante quis lectus elementum tincidunt. In vestibulum erat dolor, facilisis pharetra orci porttitor molestie. Vestibulum cursus nibh sit amet risus aliquet scelerisque. Praesent sed velit dictum, ultrices metus hendrerit, volutpat sem. Ut vel tincidunt ante. Donec in dolor et dui tincidunt fermentum. Mauris sit amet nisl ipsum.\n\nPhasellus aliquam orci leo, a ornare ipsum pulvinar ut. Pellentesque non pellentesque lacus, quis luctus augue. Cras vulputate at nibh et volutpat. Vivamus aliquet sit amet massa id fermentum. Vestibulum lobortis metus quis tellus euismod laoreet vel laoreet enim. Duis at dolor ut mauris venenatis dictum ac eu diam. Nunc vitae turpis eu quam imperdiet luctus.\n\nVivamus tempus, nisl sit amet suscipit aliquam, mi odio vulputate sem, ac fermentum sapien lacus eu felis. Morbi id justo magna. Ut venenatis tellus tellus, vel facilisis ligula tristique vel. Maecenas eu aliquet ex. Cras semper dolor vel cursus rhoncus. Curabitur felis quam, tincidunt nec fringilla sed, tempor vel velit. Quisque vel luctus nisi. Vestibulum nibh magna, tincidunt molestie nisl et, maximus accumsan dolor. Integer sodales, erat et varius gravida, magna eros hendrerit tellus, porta lacinia eros nisl et mauris. Quisque fermentum, nen lacus eu felis. Morbi id justo magna. Ut venenatis tellus tellus, vel facilisis ligula tristique vel. Maecenas eu aliquet ex. Cras semper dolor vel cursus rhoncus. Curabitur felis quam, tincidunt nec fringilla sed, tempor vel velit. Quisque vel luctus nisi. Vestibulum nibh magna, tincidunt molestie nisl et, maximus accumsan dolor. Integer sodales, erat et varius gravida, magna eros hendrerit tellus, porta lacinia eros nisl et mauris. Quisque fermentum, n',
      image:
        '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
      readTime: '3 min read',
      viewsCount: 85,
      slug: 'how-to-build-high-performance-teams',
      isPublished: true,
      publishedAt: '2019-08-06T20:29:08.956Z',
      isDeleted: false,
      createdAt: '2019-08-06T20:28:16.573Z',
      updatedAt: '2019-08-17T13:57:34.845Z',
      deletedAt: null,
      author: {
        firstName: 'Halimah',
        lastName: 'Oladosu',
        image:
          'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
      },
      Tags: [
        {
          name: 'technology'
        }
      ]
    },
    {
      id: 4,
      title: 'how-to-build-high-performance-teams',
      userId: 5,
      description: null,
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam, vitae interdum justo volutpat. Mauris rhoncus ante et est dignissim, at mollis est ullamcorper. Donec sapien ipsum, facilisis a leo in, bibendum feugiat sapien. Nullam non augue ut leo lobortis consectetur at a elit. Quisque pretium mauris luctus mi lacinia auctor. Mauris sodales ultricies dolor, id gravida nibh scelerisque sed. Sed elementum, diam nec mattis maximus, massa massa mattis ipsum, quis venenatis elit massa eget velit. Nam finibus fermentum mauris, nec tristique sem. Aenean ac feugiat nisi. Nulla pellentesque velit nec rutrum lobortis.\nmolestie nisl et, maximus accumsan dolor. Integer sodales, erat et varius gravida, magna eros hendrerit tellus, porta lacinia eros nisl et mauris. Quisque fermentum, n',
      image:
        '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
      readTime: 'Less than 1 min read',
      viewsCount: 67,
      slug: 'how-to-build-high-performance-teams-1',
      isPublished: true,
      publishedAt: '2019-08-06T20:30:56.378Z',
      isDeleted: false,
      createdAt: '2019-08-06T20:30:18.193Z',
      updatedAt: '2019-08-16T13:40:27.568Z',
      deletedAt: null,
      author: {
        firstName: 'Halimah',
        lastName: 'Oladosu',
        image:
          'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
      },
      Tags: [
        {
          name: 'technology'
        }
      ]
    }
  ]
};

describe('PublishedArticle page', () => {
  describe('PublishArticle actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('dispatches getPublishedArticlesStart action', () => {
      const expectedActions = [{ type: 'GET_PUBLISHED_ARTICLES_START' }];

      store.dispatch(getPublishedArticlesStart());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches getPublishedArticlesSuccess action', done => {
      const expectedActions = [
        { type: 'GET_PUBLISHED_ARTICLES_START' },
        {
          type: 'GET_PUBLISHED_ARTICLES_SUCCESS',
          publishedArticles: response.data
        }
      ];

      store.dispatch(getPublishedArticlesSuccess(response.data));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches getPublishedArticles action', done => {
      const token = 'some-token';
      moxios.stubRequest(
        'https://persephone-backend-staging.herokuapp.com/api/v1/articles/publish',
        {
          status: 200,
          response: response
        }
      );

      const expectedActions = [
        { type: 'GET_PUBLISHED_ARTICLES_START' },
        {
          type: 'GET_PUBLISHED_ARTICLES_SUCCESS',
          publishedArticles: response.data
        }
      ];
      store = mockStore({});

      store.dispatch(getPublishedArticles(token)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });

    it('dispatches getPublishedArticles action error', done => {
      const error = {
        data: {
          data: {
            message: 'something went wrong'
          }
        }
      };
      moxios.stubRequest(
        'https://persephone-backend-staging.herokuapp.com/api/v1/articles/publish',
        {
          status: 401,
          response: error
        }
      );

      const expectedActions = [{ type: 'GET_PUBLISHED_ARTICLES_START' }];
      store = mockStore({});

      store.dispatch(getPublishedArticles());

      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

    it('dispatches unpublishArticle action error', done => {
      const slug = 'some-token';
      const token = 'some-token';
      const error = {
        data: {
          data: {
            message: 'something went wrong'
          }
        }
      };
      moxios.stubRequest(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/unpublish/${slug}`,
        {
          status: 401,
          response: error
        }
      );

      const expectedActions = [{ type: 'GET_PUBLISHED_ARTICLES_START' }];
      store = mockStore({});

      store.dispatch(unpublishArticle(token, slug));

      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

    it('dispatches unpublishArticle action', done => {
      const slug = 'some-slug';
      const token = 'some-token';
      moxios.stubRequest(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/unpublish/${slug}`,
        {
          status: 200,
          response: {
            status: 'success',
            data: {
              message: 'Article published successfully'
            }
          }
        }
      );

      const expectedActions = [{ type: 'GET_PUBLISHED_ARTICLES_START' }];
      store = mockStore({});
      store.dispatch(unpublishArticle(slug, token));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches unpublishArticleSuccess action', done => {
      const result = {
        status: 'success',
        data: {
          message: 'Article published successfully'
        }
      };
      const expectedActions = [
        {
          type: 'UNPUBLISHED_ARTICLES_SUCCESS',
          message: 'Article published successfully'
        }
      ];
      store = mockStore({});
      store.dispatch(unpublishArticleSuccess(result.data.message));
      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

    it('dispatches unpublishArticleSuccess action', done => {
      const result = {
        status: 'success',
        data: {
          message: 'Article published successfully'
        }
      };
      const expectedActions = [
        {
          type: 'UNPUBLISHED_ARTICLES_SUCCESS',
          message: 'Article published successfully'
        }
      ];
      store = mockStore({});
      store.dispatch(unpublishArticleSuccess(result.data.message));
      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

    it('dispatches publishArticleSuccess action', done => {
      const result = {
        status: 'fail',
        data: {
          message: 'Article not found'
        }
      };
      const expectedActions = [
        {
          type: 'ERROR_RESPONSE_ON_ARTICLE',
          error: 'Article not found'
        }
      ];
      store = mockStore({});
      store.dispatch(errorResponse(result.data.message));
      expect(store.getActions()).toEqual(expectedActions);

      done();
    });
  });

  describe('PublishedArticle reducers', () => {
    const initialState = {
      publishedArticles: null,
      loading: false,
      unpublishMessageSuccess: null,
      error: null
    };

    it('Should return default state', () => {
      const newState = publishArticleReducer(undefined, {});
      expect(newState).toEqual(initialState);
    });

    it('Should return a new state if it recieves GET_PUBLISHED_ARTICLES_START in action type', () => {
      const state = {
        publishedArticles: null,
        loading: true,
        unpublishMessageSuccess: null,
        error: null
      };
      const newState = publishArticleReducer(initialState, {
        type: GET_PUBLISHED_ARTICLES_START
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves GET_PUBLISHED_ARTICLES_SUCCESS in action type', () => {
      const state = {
        publishedArticles: response.data,
        loading: false,
        unpublishMessageSuccess: null,
        error: null
      };
      const newState = publishArticleReducer(initialState, {
        type: GET_PUBLISHED_ARTICLES_SUCCESS,
        publishedArticles: response.data
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves UNPUBLISHED_ARTICLES_SUCCESS in action type', () => {
      const state = {
        publishedArticles: null,
        loading: false,
        unpublishMessageSuccess: 'Article unpublished successfully',
        error: null
      };
      const newState = publishArticleReducer(initialState, {
        type: UNPUBLISHED_ARTICLES_SUCCESS,
        message: 'Article unpublished successfully'
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves ERROR_RESPONSE_ON_ARTICLE in action type', () => {
      const state = {
        publishedArticles: null,
        loading: false,
        unpublishMessageSuccess: null,
        error: 'something went wrong'
      };
      const newState = publishArticleReducer(initialState, {
        type: ERROR_RESPONSE_ON_ARTICLE,
        error: 'something went wrong'
      });
      expect(newState).toEqual(state);
    });
  });

  describe('PublishArticle ', () => {
    beforeEach(() => {
      store = mockStore();
    });
    it('should render Publish Article Page', () => {
      const props = {
        lightTheme: false,
        publications: response.data,
        fetchPublishedArticles: jest.fn(),
        show: false,
        auth: {
          user: {
            firstName: 'damilola'
          }
        }
      };
      store = mockStore({
        theme: {
          theme: {}
        },
        auth: {
          user: {
            firstName: 'damilola',
            userName: 'dami'
          }
        }
      });
      mount(
        <Provider store={store}>
          <BrowserRouter>
            <PublishedArticle {...props} handleChange={jest.fn()} />
          </BrowserRouter>
        </Provider>
      );
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).fetchPublishedArticles();
    });

    it('should render Publish Article Page and dispatch the unpublish function and fetch function', () => {
      const props = {
        lightTheme: false,
        token: 'some-token',
        user: jest.fn(),
        publications: response.data,
        fetchPublishedArticles: jest.fn(),
        unpublishArticle: jest.fn(),
        auth: {
          user: {
            firstName: 'damilola'
          }
        }
      };
      store = mockStore({
        theme: {
          theme: {}
        },
        auth: {
          user: {
            firstName: 'damilola',
            userName: 'dami'
          }
        }
      });
      const publishArticle = mount(
        <Provider store={store}>
          <BrowserRouter>
            <PublishedArticle {...props} handleChange={jest.fn()} />
          </BrowserRouter>
        </Provider>
      );
      const unpublish = publishArticle.find(
        '#how-to-build-high-performance-teams input'
      );
      unpublish.simulate('click');
      const confirmButton = publishArticle.find('.no-article-confirm-yes a');
      confirmButton.simulate('click');
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).fetchPublishedArticles();
      mapDispatchToProps(dispatch).unpublishArticle();
    });

    it('should render Publish Article Page with user has no articles published yet', () => {
      const props = {
        lightTheme: true,
        token: 'some-token',
        user: jest.fn(),
        publications: [],
        fetchPublishedArticles: jest.fn(),
        unpublishArticle: jest.fn(),
        componentWillMount: jest.fn(),
        auth: {
          user: {
            firstName: 'damilola'
          }
        }
      };
      store = mockStore({
        theme: {
          theme: {}
        },
        auth: {
          user: {
            firstName: 'damilola',
            userName: 'dami'
          }
        }
      });
      const publishArticle = mount(
        <Provider store={store}>
          <BrowserRouter>
            <PublishedArticle {...props} handleChange={jest.fn()} />
          </BrowserRouter>
        </Provider>
      );
      const noArticles = publishArticle.find('.no-article-container h3');
      expect(noArticles.text()).toEqual(
        'Oops! You have no articles published yet'
      );
    });

    it('should render Publish Article Page', () => {
      const props = {
        lightTheme: false,
        publications: null,
        fetchPublishedArticles: jest.fn(),
        show: false,
        auth: {
          user: {
            firstName: 'damilola'
          }
        }
      };
      store = mockStore({
        theme: {
          theme: {}
        },
        auth: {
          user: {
            firstName: 'damilola',
            userName: 'dami'
          }
        }
      });
      mount(
        <Provider store={store}>
          <BrowserRouter>
            <PublishedArticle {...props} handleChange={jest.fn()} />
          </BrowserRouter>
        </Provider>
      );
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).fetchPublishedArticles();
    });
  });
});
