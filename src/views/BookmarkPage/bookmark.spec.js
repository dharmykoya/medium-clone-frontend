import axios from 'axios';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  createBookmark,
  getbookmarkedArticles,
  removeBookmark
} from '../BookmarkPage/bookmark.action';
import bookmarkReducer from '../BookmarkPage/bookmark.reducer';
import {
  CREATE_BOOKMARK_SUCCESS,
  CREATE_BOOKMARK_FAIL,
  ERROR_RESPONSE_ON_ARTICLE,
  GET_BOOKMARKED_ARTICLES_START,
  REMOVE_BOOKMARK_SUCCESS,
  GET_BOOKMARKED_ARTICLES_SUCCESS
} from '../../actionTypes';

configure({ adapter: new Adapter() });

jest.mock('axios');
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

describe('Bookmark Reducer Tests', () => {
  const initialState = {
    bookmarkedArticles: null,
    loading: false,
    removeBookmarkMessageSuccess: null,
    error: null
  };
  it('Should return a new state if it recieves a create bookmark action type', () => {
    const message = 'create bookmark successfully';
    const newState = bookmarkReducer(undefined, {
      type: CREATE_BOOKMARK_SUCCESS,
      payload: message
    });
    expect(newState).toEqual({
      ...initialState,
      bookmarkCreated: 'create bookmark successfully'
    });
  });
  it('Should return a new state if it recieves create bookmark error action type', () => {
    const message = 'create bookmark failed';
    const newState = bookmarkReducer(undefined, {
      type: CREATE_BOOKMARK_FAIL,
      payload: message
    });
    expect(newState).toEqual({
      ...initialState,
      bookmarkCreatedError: 'create bookmark failed'
    });
  });
  it('Should return default state', () => {
    const newState = bookmarkReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return a new state if it recieves a error response action type', () => {
    const state = {
      bookmarkedArticles: null,
      loading: false,
      removeBookmarkMessageSuccess: null,
      error: 'something went wrong'
    };
    const newState = bookmarkReducer(initialState, {
      type: ERROR_RESPONSE_ON_ARTICLE,
      error: 'something went wrong'
    });
    expect(newState).toEqual(state);
  });

  it('Should return a new state if it recieves GET_BOOKMARKED_ARTICLES_START in action type', () => {
    const state = {
      bookmarkedArticles: null,
      loading: true,
      removeBookmarkMessageSuccess: null,
      error: null
    };
    const newState = bookmarkReducer(initialState, {
      type: GET_BOOKMARKED_ARTICLES_START
    });
    expect(newState).toEqual(state);
  });

  it('Should return a new state if it recieves GET_BOOKMARKED_ARTICLES_SUCCESS in action type', () => {
    const state = {
      bookmarkedArticles: response.data,
      loading: false,
      removeBookmarkMessageSuccess: null,
      error: null
    };
    const newState = bookmarkReducer(initialState, {
      type: GET_BOOKMARKED_ARTICLES_SUCCESS,
      bookmarkedArticles: response.data
    });
    expect(newState).toEqual(state);
  });

  it('Should return a new state if it recieves REMOVE_BOOKMARK_SUCCESS in action type', () => {
    const state = {
      bookmarkedArticles: null,
      loading: false,
      removeBookmarkMessageSuccess: 'Bookmark removed successfully',
      error: null
    };
    const newState = bookmarkReducer(initialState, {
      type: REMOVE_BOOKMARK_SUCCESS,
      message: 'Bookmark removed successfully'
    });
    expect(newState).toEqual(state);
  });
});

describe('Bookmarks Action Tests', () => {
  const bookmarkParams = {
    slug: 'some-slug',
    token: 'some-token'
  };
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  beforeEach(() => {
    store = mockStore({});
    jest.resetAllMocks();
  });
  afterEach(() => {
    store.clearActions();
  });

  it('Should Trigger the CREATE_BOOKMARK_SUCCESS dispatch function', async () => {
    const response = {
      status: 201,
      data: {
        data: {
          message: 'Successful'
        }
      }
    };

    axios.post.mockResolvedValueOnce(response);

    const expectedActions = [
      { type: 'CREATE_BOOKMARK_SUCCESS', payload: 'Successful' }
    ];
    store
      .dispatch(createBookmark(bookmarkParams.slug, bookmarkParams.token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Should Trigger the CREATE_BOOKMARK_FAIL dispatch function', async () => {
    const error = {
      response: {
        status: 400,
        data: {
          data: {
            message: 'fail'
          }
        }
      }
    };

    axios.post.mockRejectedValueOnce(error);

    const expectedActions = [{ type: 'CREATE_BOOKMARK_FAIL', payload: 'fail' }];
    store
      .dispatch(createBookmark(bookmarkParams.slug, bookmarkParams.token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Should Trigger the GET_ALL_BOOKMARK_SUCCESS dispatch function', async () => {
    const response = {
      status: 200,
      data: {
        data: {
          payload: 'Successful'
        }
      }
    };

    axios.get.mockResolvedValueOnce(response);

    const expectedActions = [
      { type: 'GET_BOOKMARKED_ARTICLES_START', payload: 'Successful' },
      { type: 'GET_BOOKMARKED_ARTICLES_SUCCESS', payload: 'Successful' }
    ];
    store.dispatch(getbookmarkedArticles(bookmarkParams.token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Should Trigger the REMOVE_BOOKMARK_SUCCESS dispatch function', async () => {
    const response = {
      status: 201,
      data: {
        data: {
          message: 'Successful'
        }
      }
    };

    axios.delete.mockResolvedValueOnce(response);

    const expectedActions = [
      { type: 'GET_BOOKMARKED_ARTICLES_START' },
      { type: 'REMOVE_BOOKMARK_SUCCESS', message: 'Successful' }
    ];
    store.dispatch(removeBookmark(bookmarkParams.token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
