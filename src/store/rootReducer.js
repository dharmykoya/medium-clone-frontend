import { combineReducers } from 'redux';
import themeToggler from '../components/Header/index.reducer';
import signupReducer from '../views/SignupPage/signup.reducer';
import loginReducer from '../views/LoginPage/login.reducer';
import singleArticleReducer from '../views/ReadArticlePage/readArticle.reducer';
import commentReducer from '../components/CreateComment/createComment.reducer';
import articlesReducer from '../views/AllArticlesPage/index.reducer';
import createArticle from '../views/CreateArticle/createArticle.reducer';
import authReducer from '../views/Auth/auth.reducer';
import bookmarkReducer from '../views/BookmarkPage/bookmark.reducer';
import publishedReducer from '../views/PublishedArticle/publishedArticle.reducer';
import draftReducer from '../views/DraftArticle/DraftArticle.reducer';
import allCommentsOnArticle from '../components/SingleComment/singleComment.reducer';
import editProfileReducer from '../components/EditProfile/editProfile.reducer';
import notificationReducer from '../components/Notifications/notification.reducer';
import updatedComment from '../components/Editcomment/editCommentReducer';
import commentEditHistory from '../components/EditCommentHistory/editCommentHistory.reducer';

const rootReducer = combineReducers({
  theme: themeToggler,
  signup: signupReducer,
  user: loginReducer,
  auth: authReducer,
  readArticle: singleArticleReducer,
  articleComment: commentReducer,
  articles: articlesReducer,
  createArticle,
  bookmarks: bookmarkReducer,
  publications: publishedReducer,
  draftArticles: draftReducer,
  commentOnArticle: allCommentsOnArticle,
  editProfile: editProfileReducer,
  notifications: notificationReducer,
  updatedComment,
  commentEditHistory
});

export default rootReducer;
