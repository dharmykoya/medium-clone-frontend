import React from 'react';
import Authorcard from '../../components/AuthorCard/index.jsx';
const ArticlePage = () => {
  return (
    <Authorcard
      image="./../src/assets/images/avatar.png"
      fullname="Firstname Lastname"
      handle="Lastma"
      bio="This would be a short summary of the users bio, for little interest
      display for readers"
      isFollowing={false}
      lightTheme={true}
    />
  );
};

export default ArticlePage;
