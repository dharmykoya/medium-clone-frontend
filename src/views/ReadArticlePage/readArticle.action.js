import axiosUtil from '../../utils/axiosConfig';
import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';
import { checkAuth } from '../../utils/checkAuth';
import { toast } from 'react-toastify';

export const getSingleArticleStart = () => {
  return {
    type: actionTypes.GET_SINGLE_ARTICLE_START
  };
};

export const getSingleArticleSuccess = article => {
  return {
    type: actionTypes.GET_SINGLE_ARTICLE_SUCCESS,
    article
  };
};

export const rateArticle = payload => {
  return { type: actionTypes.RATE_ARTICLE, payload };
};

export const rateArticleError = payload => {
  return { type: actionTypes.RATE_ARTICLE_ERROR, payload };
};

export const cleanUpRating = () => {
  return { type: actionTypes.CLEAN_UP_RATING, payload: {} };
};

export const followAuthor = payload => {
  return { type: actionTypes.FOLLOW_AUTHOR, payload };
};

export const getUserFollowers = payload => {
  return { type: actionTypes.GET_USER_FOLLOWERS, payload };
};

export const cleanUpFollow = () => {
  return { type: actionTypes.CLEAN_UP_FOLLOW, payload: null };
};

export const getSingleArticle = slug => {
  return dispatch => {
    dispatch(getSingleArticleStart());
    return axios
      .get(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}`
      )
      .then(response => {
        dispatch(getSingleArticleSuccess(response.data.data));
      });
  };
};

export const articleLike = (id, slug, token) => {
  return dispatch => {
    return axios
      .get(`${process.env.BASE_URL}articles/${id}/reactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        /* istanbul ignore next */
        axios
          .get(
            `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}`
          )
          .then(response => {
            const { data } = response.data;
            dispatch(getSingleArticleSuccess(data));
          });
      })
      .catch(() => {
        toast.error('You need an account to like this article');
      });
  };
};

export const rateArticleRequest = payload => {
  return async dispatch => {
    try {
      if (!checkAuth()) {
        throw {
          response: {
            data: {
              status: 'fail',
              data: `You need to sign in to rate this article`
            }
          }
        };
      }
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axiosUtil.post(`articles/ratings`, payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      dispatch(rateArticle(response.data));
      dispatch(cleanUpRating());
    } catch (error) {
      dispatch(rateArticleError(error.response.data));
      dispatch(cleanUpRating());
    }
  };
};

export const reportArticleRequest = (slug, reason, token) => {
  axios
    .post(
      `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/reports`,
      reason,
      { headers: { authorization: `Bearer ${token}` } }
    )
    .then(response => {
      if (response.status === 201) {
        toast.success(`Successfully reported this article`);
      }
    });
};

export const followAuthorRequest = (userId, token) => {
  return async dispatch => {
    const response = await axiosUtil.post(
      `users/follow/`,
      { userId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch(followAuthor(response.data.data));
    dispatch(cleanUpFollow());
  };
};

export const getUserFollowersRequest = (id, token) => {
  return async dispatch => {
    const response = await axiosUtil.get(`users/follow/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(getUserFollowers(response.data.data));
  };
};
