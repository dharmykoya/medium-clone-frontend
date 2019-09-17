import {
  CREATE_ARTICLE_START,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL
} from '../../actionTypes/index';
import axios from 'axios';
import { toast } from 'react-toastify';

export const createArticle = (data, isPublish, history) => {
  return dispatch => {
    dispatch(createArticleStart());
    // get user token
    let tokenId;
    const user = localStorage.getItem('user');
    /* istanbul ignore next */
    if (user) {
      const { token } = JSON.parse(user);
      tokenId = token;
    }
    return (
      axios
        .post(`${process.env.BASE_URL}articles`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${tokenId}`
          }
        })
        /* istanbul ignore next */
        .then(res => {
          /* istanbul ignore next */
          const slug = res.data.data.slug;
          /* istanbul ignore next */

          /* istanbul ignore next */
          if (isPublish !== 'publish') {
            /* istanbul ignore next */
            dispatch(createArticleSuccess(res.data.data));
            /* istanbul ignore next */
            toast.success('Your article has been saved successfully');
            setTimeout(() => {
              /* istanbul ignore next */
              history.push(`/publications`);
            }, 3000);
          }

          if (isPublish === 'publish') {
            /* istanbul ignore next */
            publishArticle(slug, tokenId, history);
            /* istanbul ignore next */
            dispatch(createArticleSuccess(res.data.data));
          }
        })
        /* istanbul ignore next */
        .catch(err => {
          /* istanbul ignore next */
          dispatch(createArticleFail(err.response.data));
          /* istanbul ignore next */
          err.response.data.error
            ? toast.error(err.response.data.error)
            : toast.error(err.response.data.message)
            ? toast.error(err.response.data.data[0].msg)
            : toast.error(err.response.data.data[1].msg);
        })
    );
  };
};
/* istanbul ignore next */
export const publishArticle = (slug, tokenId, history) => {
  // publish article
  axios
    .put(`${process.env.BASE_URL}articles/publish/${slug}`, null, {
      headers: { authorization: `Bearer ${tokenId}` }
    })
    .then(() => {
      /* istanbul ignore next */
      toast.success('Your article has been successfully published');
      setTimeout(() => {
        /* istanbul ignore next */
        history.push(`/articles/${slug}`);
      }, 3000);
    });
};

export const createArticleStart = () => {
  return {
    type: CREATE_ARTICLE_START
  };
};
/* istanbul ignore next */
export const createArticleSuccess = res => {
  return {
    type: CREATE_ARTICLE_SUCCESS,
    payload: res
  };
};

export const createArticleFail = payload => {
  return {
    type: CREATE_ARTICLE_FAIL,
    payload
  };
};
