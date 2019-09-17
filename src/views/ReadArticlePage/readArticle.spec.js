jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import moxios from 'moxios';
import { mount, configure, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import readArticleReducer from './readArticle.reducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {
  getSingleArticle,
  getSingleArticleStart,
  getSingleArticleSuccess,
  articleLike
} from './readArticle.action';
import { ReadArticle, mapDispatchToProps, mapStateToProps } from './index.jsx';
import {
  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_START
} from '../../actionTypes/index';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

const response = {
  status: 'success',
  data: {
    id: 19,
    title: 'how-to-build-high-performance-teams',
    userId: 5,
    description: null,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam',
    image:
      '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
    readTime: '1 min read',
    viewsCount: 1,
    slug: 'how-to-build-high-performance-teams-16',
    isPublished: true,
    publishedAt: '2019-08-06T20:47:09.975Z',
    isDeleted: false,
    createdAt: '2019-08-06T20:44:44.966Z',
    updatedAt: '2019-08-12T01:23:34.044Z',
    deletedAt: null,
    author: {
      firstName: 'Halimah',
      lastName: 'Oladosu',
      image:
        'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
    },
    Tags: [
      {
        name: 'product'
      },
      {
        name: 'design'
      }
    ],
    likesCount: 0,
    likers: [],
    rating: {
      totalNumberOfRatings: 0,
      sumOfRatings: 0,
      averageRating: 0
    }
  }
};

const result = {
  status: 'success',
  data: {
    article: {
      id: 12,
      title: 'how-to-build-high-performance-teams',
      description: null,
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam, vitae interdum justo volutpat. Mauris rhoncus ante et est dignissim, at mollis est ullamcorper. Donec sapien ipsum, facilisis a leo in, bibendum feugiat sapien. Nullam non augue ut leo lobortis consectetur at a elit. Quisque pretium mauris luctus mi lacinia auctor. Mauris sodales ultricies dolor, id gravida nibh scelerisque sed. Sed elementum, diam nec mattis maximus, massa massa mattis ipsum, quis venenatis elit massa eget velit. Nam finibus fermentum mauris, nec tristique sem. Aenean ac feugiat nisi. Nulla pellentesque velit nec rutrum lobortis.\nmolestie nisl et, maximus accumsan dolor. Integer sodales, erat et varius gravida, magna eros hendrerit telluonsectetur at a elit. Quisque pretium mauris luctus mi lacinia auctor. Mauris sodales ultricies dolor, id gravida nibh scelerisque sed. Sed elementum, diam nec mattis maximus, massa massa mattis ipsum, quis venenatis elit massa eget velit. Nam finibus fermentum mauris, nec tristique sem. Aenean ac feugiat nisi. Nulla pellentesque velit nec rutrum lobortis.\nmolestie nisl et, maximus accumsan dolor. Integer sodales, erat et varius gravida, magna eros hendrerit tellus, porta lacinia eros nisl et mauris. Quisque fermentum, nonsectetur at a elit. Quisque pretium mauris luctus mi lacinia auctor. Mauris sodales ultricies dolor, id gravida nibh scelerisque sed. Sed elementum, diam nec mattis maximus, massa massa mattis ipsum, quis venenatis elit massa eget velit. Nam finibus fermentum mauris, nec tristique sem. Aenean ac feugiat nisi. Nulla pellentesque velit nec rutrum lobortis.\nmolestie nisl et, maximus accumsan dolor. Integer sodales, erat et varius gravida, magna eros hendrerit tellus, porta lacinia eros nisl et mauris. Quisque fermentum, ns, porta lacinia eros nisl et mauris. Quisque fermentum, n',
      image:
        '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
      readTime: '1 min read',
      viewsCount: 254,
      slug: 'how-to-build-high-performance-teams-9',
      isPublished: true,
      publishedAt: '2019-08-18T21:21:58.898Z',
      isDeleted: false,
      createdAt: '2019-08-06T20:39:13.934Z',
      deletedAt: null
    },
    comments: [
      {
        id: 1,
        body: {
          'Thu Aug 22 2019 00:16:52 GMT+0000': 'this article is awesome'
        },
        highlightedText: null,
        slug: 'how-to-build-high-performance-teams-9',
        createdAt: '2019-08-22T00:16:52.678Z',
        userComment: {
          firstName: 'some',
          lastName: 'user',
          userName: null,
          email: 'user@fola.com'
        },
        commentLikes: [
          {
            id: 48,
            userId: 28,
            email: 'user@fola.com',
            commentId: 1,
            createdAt: '2019-08-22T13:35:17.757Z',
            updatedAt: '2019-08-22T13:35:17.757Z'
          }
        ]
      },
      {
        id: 2,
        body: {
          'Thu Aug 22 2019 00:17:29 GMT+0000':
            'Thank you for writing the article'
        },
        highlightedText: null,
        slug: 'how-to-build-high-performance-teams-9',
        createdAt: '2019-08-22T00:17:29.778Z',
        userComment: {
          firstName: 'some',
          lastName: 'user',
          userName: null,
          email: 'user@fola.com'
        },
        commentLikes: []
      },
      {
        id: 5,
        body: {
          'Thu Aug 22 2019 00:41:58 GMT+0000': 'Okay o'
        },
        highlightedText: null,
        slug: 'how-to-build-high-performance-teams-9',
        createdAt: '2019-08-22T00:41:58.006Z',
        userComment: {
          firstName: 'some',
          lastName: 'user',
          userName: null,
          email: 'user@fola.com'
        },
        commentLikes: [
          {
            id: 55,
            userId: 28,
            email: 'user@fola.com',
            commentId: 5,
            createdAt: '2019-08-22T13:50:21.981Z',
            updatedAt: '2019-08-22T13:50:21.981Z'
          }
        ]
      }
    ]
  }
};
describe('Read Single Article Page', () => {
  describe('ReadArticle Actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    const defaultProps = {
      fetchSingleArticle: jest.fn(),
      likeArticle: jest.fn(),
      match: { params: 'risk-involved-in-business' },
      loading: false,
      article: response.data,
      lightTheme: true,
      handleLikes: jest.fn(),
      user: {
        followers: []
      },
      auth: {
        user: {
          token: ''
        }
      }
    };

    const state = {};

    it('should like an article', () => {
      const component = shallow(<ReadArticle {...defaultProps} {...state} />);
      const instance = component.instance();
      jest.spyOn(instance, 'handleArticleLike');
      instance.handleArticleLike({ value: '' });
      expect(instance.handleArticleLike).toHaveBeenCalled();
    });
  });

  it('dispatches getSingleArticleStart action', done => {
    const expectedActions = [{ type: 'GET_SINGLE_ARTICLE_START' }];

    store.dispatch(getSingleArticleStart());

    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('dispatches getSingleArticleSuccess action', done => {
    const expectedActions = [
      { type: 'GET_SINGLE_ARTICLE_START' },
      {
        type: 'GET_SINGLE_ARTICLE_SUCCESS',
        article: {
          id: 19,
          title: 'how-to-build-high-performance-teams',
          userId: 5,
          description: null,
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam',
          image:
            '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
          readTime: '1 min read',
          viewsCount: 1,
          slug: 'how-to-build-high-performance-teams-16',
          isPublished: true,
          publishedAt: '2019-08-06T20:47:09.975Z',
          isDeleted: false,
          createdAt: '2019-08-06T20:44:44.966Z',
          updatedAt: '2019-08-12T01:23:34.044Z',
          deletedAt: null,
          author: {
            firstName: 'Halimah',
            lastName: 'Oladosu',
            image:
              'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
          },
          Tags: [
            {
              name: 'product'
            },
            {
              name: 'design'
            }
          ],
          likesCount: 0,
          likers: [],
          rating: {
            totalNumberOfRatings: 0,
            sumOfRatings: 0,
            averageRating: 0
          }
        }
      }
    ];

    store.dispatch(getSingleArticleSuccess(response.data));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('dispatches getSingleArticle action', done => {
    const slug = 'how-to-build-high-performance-teams-16';

    moxios.stubRequest(
      `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}`,
      {
        status: 200,
        response: response
      }
    );

    const expectedActions = [
      { type: 'GET_SINGLE_ARTICLE_START' },
      {
        type: 'GET_SINGLE_ARTICLE_SUCCESS',
        article: {
          id: 19,
          title: 'how-to-build-high-performance-teams',
          userId: 5,
          description: null,
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam',
          image:
            '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
          readTime: '1 min read',
          viewsCount: 1,
          slug: 'how-to-build-high-performance-teams-16',
          isPublished: true,
          publishedAt: '2019-08-06T20:47:09.975Z',
          isDeleted: false,
          createdAt: '2019-08-06T20:44:44.966Z',
          updatedAt: '2019-08-12T01:23:34.044Z',
          deletedAt: null,
          author: {
            firstName: 'Halimah',
            lastName: 'Oladosu',
            image:
              'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
          },
          Tags: [
            {
              name: 'product'
            },
            {
              name: 'design'
            }
          ],
          likesCount: 0,
          likers: [],
          rating: {
            totalNumberOfRatings: 0,
            sumOfRatings: 0,
            averageRating: 0
          }
        }
      },
      { type: 'GET_SINGLE_ARTICLE_START' }
    ];

    store.dispatch(getSingleArticle(slug));

    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('dispatches articleLikes action', done => {
    const slug = 'risk-involved-in-business';
    const id = 94;
    const token = 'arwetrwetert';

    moxios.stubRequest(
      `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${id}/reactions`,
      {
        status: 200,
        response: {
          data: {
            message: 'You have liked this article'
          }
        }
      }
    );

    const expectedActions = [
      { type: 'GET_SINGLE_ARTICLE_START' },
      {
        type: 'GET_SINGLE_ARTICLE_SUCCESS',
        article: {
          id: 19,
          title: 'how-to-build-high-performance-teams',
          userId: 5,
          description: null,
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam',
          image:
            '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
          readTime: '1 min read',
          viewsCount: 1,
          slug: 'how-to-build-high-performance-teams-16',
          isPublished: true,
          publishedAt: '2019-08-06T20:47:09.975Z',
          isDeleted: false,
          createdAt: '2019-08-06T20:44:44.966Z',
          updatedAt: '2019-08-12T01:23:34.044Z',
          deletedAt: null,
          author: {
            firstName: 'Halimah',
            lastName: 'Oladosu',
            image:
              'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
          },
          Tags: [
            {
              name: 'product'
            },
            {
              name: 'design'
            }
          ],
          likesCount: 0,
          likers: [],
          rating: {
            totalNumberOfRatings: 0,
            sumOfRatings: 0,
            averageRating: 0
          }
        }
      },
      { type: 'GET_SINGLE_ARTICLE_START' }
    ];

    store.dispatch(articleLike(id, slug, token));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});

describe('ReadArticle Reducers', () => {
  const initialState = {
    article: null,
    loading: false
  };

  it('Should return default state', () => {
    const newState = readArticleReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return a new state if it recieves GET_SINGLE_ARTICLE_START in action type', () => {
    const state = {
      article: null,
      loading: true
    };
    const newState = readArticleReducer(initialState, {
      type: GET_SINGLE_ARTICLE_START
    });
    expect(newState).toEqual(state);
  });

  it('Should return a new state if it recieves GET_SINGLE_ARTICLE_SUCCESS in action type', () => {
    const article = {
      id: 19,
      title: 'how-to-build-high-performance-teams',
      userId: 5,
      description: null
    };
    const expectedAction = {
      article: article,
      loading: false
    };
    const newState = readArticleReducer(initialState, {
      type: GET_SINGLE_ARTICLE_SUCCESS,
      article,
      loading: false
    });

    expect(newState).toEqual(expectedAction);
  });
});

describe('ReadArticle Page', () => {
  it('should render read article page', done => {
    const props = {
      lightTheme: false,
      article: null,
      fetchSingleArticle: jest.fn(),
      match: {
        params: 'product'
      }
    };
    const readArticle = mount(
      <BrowserRouter>
        <ReadArticle {...props} />
      </BrowserRouter>
    );
    const loadingIcon = readArticle.find('.loader');
    expect(loadingIcon).toBeTruthy();
    done();
  });
});

describe('ReadArticle Page', () => {
  it('should render read article page', done => {
    const props = {
      lightTheme: false,
      article: null,
      fetchSingleArticle: jest.fn(),
      match: {
        params: 'product'
      },
      auth: {
        isAthenticated: false,
        user: {
          token: 'kdnfm'
        }
      },
      getAllUserBookmarks: jest.fn(),
      createBookmark: jest.fn(),
      loading: false,
      token: 'some-token'
    };
    let store = mockStore({
      theme: false,
      article: response.data,
      readArticle: response.data,
      articleComment: true,
      signup: { token: 'some-token' }
    });

    const readArticle = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ReadArticle {...props} />
        </BrowserRouter>
      </Provider>
    );
    const readArticlePage = readArticle.find('.article-title');
    expect(readArticlePage).toBeTruthy();
    done();
  });

  it('should render an article', done => {
    const props = {
      lightTheme: false,
      article: response.data,
      fetchSingleArticle: jest.fn(),
      getAllUserBookmarks: jest.fn(),
      createBookmark: jest.fn(),
      match: {
        params: {
          slug: 'some-slug'
        }
      },
      user: {
        followers: []
      },
      auth: {
        user: {
          token: 'kdnfm'
        }
      },
      loading: false,
      onStarClick: jest.fn(),
      rateArticleRequest: jest.fn(),
      token: 'some-token',
      bookmark: {
        allUserBookmark: {
          bookmarks: [
            {
              title: 'some title'
            }
          ]
        }
      }
    };

    let store = mockStore({
      theme: false,
      article: response.data,
      readArticle: response.data,
      articleComment: true,
      signup: { token: 'some-token' },
      commentOnArticle: {
        allComment: result.data
      },
      auth: {
        isAuthenticated: true,
        user: {
          token: 'some-token'
        }
      }
    });
    const readArticle = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ReadArticle {...props} />
        </BrowserRouter>
      </Provider>
    );
    const readArticlePage = readArticle.find('.article-title');
    expect(readArticlePage).toBeTruthy();
    done();
  });

  it('should render with initial dispatch state', done => {
    const initialState = {
      readArticle: {
        article: null,
        loading: false
      },
      theme: {
        theme: 'dark-theme'
      },
      commentOnArticle: {
        allComment: null
      },
      auth: {
        user: {
          token: 'tyrtyt'
        }
      }
    };
    expect(mapStateToProps(initialState).article).toEqual(null);
    expect(mapStateToProps(initialState).loading).toEqual(false);
    done();
  });

  it('should dispatch action', done => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchSingleArticle();
    expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
    done();
  });

  it('should dispatch action', done => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchSingleArticle();
    expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
    done();
  });

  it('should dispatch createBookmark action', done => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).createBookmark();
    expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
    done();
  });
  it('should dispatch action', done => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).likeArticle();
    expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
    done();
  });
});

describe('Report article action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  const token = 'some token';
  const reason = { reason: 'some reason' };
  const slug = 'some slug';

  it('should trigger report article action', done => {
    moxios.stubRequest(
      `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/reports`,
      {
        status: 201,
        response: {}
      }
    );

    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).reportArticleRequest(token, reason, slug);
    done();
  });
});
