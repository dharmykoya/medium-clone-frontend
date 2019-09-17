import React, { Component } from 'react';

import Authorcard from '../components/AuthorCard/index.jsx';
export class author extends Component {
  render() {
    return (
      <div>
        <Authorcard
          image="./../src/assets/images/avatar.png"
          fullname="Firstname Lastname"
          handle="Lastma"
          bio="This would be a short summary of the users bio, for little interest
      display for readers"
          isFollowing={false}
          lightTheme={true}
        />
      </div>
    );
  }
}

export default author;
