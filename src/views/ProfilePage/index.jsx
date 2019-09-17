import React from 'react';
import { Route } from 'react-router-dom';
import './ProfilePage.scss';

const ProfilePageRoute = ({ component: Component, path, token, ...rest }) => {
  return (
    <div className="">
      <div>
        <Route
          {...rest}
          path={path}
          render={props => <Component {...props} token={token} />}
        />
      </div>
    </div>
  );
};

export default ProfilePageRoute;
