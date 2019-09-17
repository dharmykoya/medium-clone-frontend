jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import moxios from 'moxios';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import singleCommentReducer from './singleComment.reducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {
  getCommentOnArticleStart,
  getCommentOnArticleSuccess,
  getCommentOnArticles,
  likeComment,
  likeCommentSuccess
} from './singleComment.action';
import SingleComment from './index.jsx';
import {
  GET_COMMENT_ON_ARTICLE_START,
  GET_COMMENT_ON_ARTICLE_SUCCESS,
  LIKE_COMMENT_ON_ARTICLE_SUCCESS
} from '../../actionTypes/index';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

const likeRespone = {
  status: 'success',
  data: {
    likeCount: {
      count: 1,
      rows: [
        {
          id: 92,
          userId: 7,
          email: 'dharmykoya38@gmail.com',
          commentId: 17,
          createdAt: '2019-08-28T07:59:21.405Z',
          updatedAt: '2019-08-28T07:59:21.405Z'
        }
      ]
    },
    message: 'you have successfully liked this comment',
    commentId: '17',
    userId: 7
  }
};

const allCommentResponse = {
  status: 'success',
  data: {
    article: {
      id: 97,
      title: 'All you should Know about the World of technology',
      description: 'the world at large',
      body:
        "No-risk matched betting\nfree bets from matched betting\n\nHands down the quickest way to make a lot of money (well, without breaking the law). Lots of students have genuinely made £100s from this technique. It's completely legal, risk free, tax free, and anyone over 18 in the UK can do it (Not in UK? Skip to no. 2).\n\nIt works by taking advantage of free bets regularly offered by journalistic research. It does not constitute financial advice. Save the Student and its authors are not liable for how tips are used, nor for content and services on external websites. Common sense should never be neglected!\n\nWe sometimes use affiliated links which may result in a payment following a visitor taking action (such as a purchase or registration) on an external website. This helps keep Save the Student free. The user experience shouldn’t be any different, and our editorial decision making is not affected by such links.\n\nPrivacy Policy - Sitemap - © 2019 Save the Student. All Rights Reserved. \nLike most sites, we use cookies to optimise your e",
      image:
        '{"0":"https://res.cloudinary.com/fxola/image/upload/v1566483734/post/20190731_095438.jpg.jpg"}',
      readTime: '20 min read',
      viewsCount: 39,
      slug: 'all-you-should-know-about-the-world-of-technology',
      isPublished: true,
      publishedAt: '2019-08-22T19:55:45.025Z',
      isDeleted: false,
      createdAt: '2019-08-22T14:22:14.540Z',
      deletedAt: null
    },
    comments: [
      {
        id: 17,
        body: {
          'Tue Aug 27 2019 13:03:03 GMT+0000': 'I love the article'
        },
        highlightedText: null,
        slug: 'all-you-should-know-about-the-world-of-technology',
        createdAt: '2019-08-27T13:03:03.338Z',
        userComment: {
          image:
            'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png',
          firstName: 'dha',
          lastName: 'dha',
          userName: 'dharmy',
          email: 'dharmykoya38@gmail.com'
        },
        commentLikes: [
          {
            id: 92,
            userId: 7,
            email: 'dharmykoya38@gmail.com',
            commentId: 17,
            createdAt: '2019-08-28T07:59:21.405Z',
            updatedAt: '2019-08-28T07:59:21.405Z'
          }
        ]
      }
    ]
  }
};

const likesCountResponse = {
  status: 'success',
  data: {
    likeCount: {
      count: 2,
      rows: [
        {
          id: 76,
          userId: 36,
          email: 'oluwafemi.medale@andela.com',
          commentId: 11,
          createdAt: '2019-08-23T11:22:55.228Z',
          updatedAt: '2019-08-23T11:22:55.228Z'
        },
        {
          id: 100,
          userId: 23,
          email: 'samuelpinheiro40@yahoo.com',
          commentId: 11,
          createdAt: '2019-08-28T12:30:58.554Z',
          updatedAt: '2019-08-28T12:30:58.554Z'
        }
      ]
    },
    message: 'you have successfully unliked this comment',
    commentId: '11',
    userId: 7
  }
};

describe('Signle Comment Test', () => {
  describe('Single Comment Actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('dispatches getCommentOnArticleStart action', done => {
      const expectedActions = [{ type: 'GET_COMMENT_ON_ARTICLE_START' }];

      store.dispatch(getCommentOnArticleStart());

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches getCommentOnArticleSuccess action', done => {
      const expectedActions = [
        { type: 'GET_COMMENT_ON_ARTICLE_START' },
        {
          type: 'GET_COMMENT_ON_ARTICLE_SUCCESS',
          allComment: likeRespone.data
        }
      ];

      store.dispatch(getCommentOnArticleSuccess(likeRespone.data));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches getCommentOnArticles action', done => {
      const slug = 'some-slug';

      moxios.stubRequest(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/comments`,
        {
          status: 200,
          response: allCommentResponse
        }
      );

      const expectedActions = [
        { type: 'GET_COMMENT_ON_ARTICLE_START' },
        {
          type: 'GET_COMMENT_ON_ARTICLE_SUCCESS',
          allComment: likeRespone.data
        },
        { type: 'GET_COMMENT_ON_ARTICLE_START' }
      ];

      store.dispatch(getCommentOnArticles(slug));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches likeComment action', done => {
      const slug = 'some-slug';
      const commentId = 92;
      const token = 'some-token';

      moxios.stubRequest(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/comments/${commentId}/reactions`,
        {
          status: 200,
          response: likeRespone.data
        }
      );

      const expectedActions = [
        { type: 'GET_COMMENT_ON_ARTICLE_START' },
        {
          type: 'GET_COMMENT_ON_ARTICLE_SUCCESS',
          allComment: likeRespone.data
        },
        { type: 'GET_COMMENT_ON_ARTICLE_START' },
        {
          type: 'GET_COMMENT_ON_ARTICLE_SUCCESS',
          allComment: allCommentResponse.data
        },
        { type: 'GET_COMMENT_ON_ARTICLE_START' }
      ];

      store.dispatch(likeComment(slug, commentId, token));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches likeComment action', done => {
      store.clearActions();
      const expectedActions = [
        {
          type: 'LIKE_COMMENT_ON_ARTICLE_SUCCESS',
          comment: likesCountResponse.data
        }
      ];

      store.dispatch(likeCommentSuccess(likesCountResponse.data));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Single comment Reducers', () => {
    const initialState = {
      allComment: null,
      loading: false,
      commentLiked: null
    };

    it('Should return default state', () => {
      const newState = singleCommentReducer(undefined, {});
      expect(newState).toEqual(initialState);
    });

    it('Should return a new state if it recieves GET_SINGLE_ARTICLE_START in action type', () => {
      const state = {
        allComment: null,
        loading: true,
        commentLiked: null
      };
      const newState = singleCommentReducer(initialState, {
        type: GET_COMMENT_ON_ARTICLE_START
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves GET_SINGLE_ARTICLE_START in action type', () => {
      const state = {
        allComment: allCommentResponse.data,
        loading: false,
        commentLiked: null
      };
      const newState = singleCommentReducer(initialState, {
        type: GET_COMMENT_ON_ARTICLE_SUCCESS,
        allComment: allCommentResponse.data
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves GET_SINGLE_ARTICLE_START in action type', () => {
      const state = {
        allComment: null,
        loading: false,
        commentLiked: likeRespone.data
      };
      const newState = singleCommentReducer(initialState, {
        type: LIKE_COMMENT_ON_ARTICLE_SUCCESS,
        comment: likeRespone.data
      });
      expect(newState).toEqual(state);
    });
  });

  describe('Single comment Component', () => {
    it('should render Single comment component', done => {
      const props = {
        commentLikes: [],
        userComment: allCommentResponse.data.comments[0].userComment,
        body: {},
        handleLike: jest.fn()
      };
      const comment = mount(
        <Provider store={store}>
          <BrowserRouter>
            <SingleComment {...props} />
          </BrowserRouter>
        </Provider>
      );

      const likeIcon = comment.find('.article-comment-like-click a');
      likeIcon.simulate('click');
      expect(likeIcon).toBeTruthy();
      done();
    });
  });
});
