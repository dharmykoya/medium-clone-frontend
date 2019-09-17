import React from 'react';
import { shallow } from 'enzyme';
import AuthorCard from './';

describe('Render component', () => {
  it('renders The Author card component in dark mode when user is not following author', () => {
    const component = shallow(
      <AuthorCard
        image="./../src/assets/images/avatar.png"
        fullname="Firstname Lastname"
        handle="Lastma"
        bio="This would be a short summary of the users bio, for little interest
    display for readers"
        isFollowing={false}
        lightTheme={false}
      />
    );

    expect(
      component.contains(
        <p className="container-fluid author-bio small-text">
          This would be a short summary of the users bio, for little interest
          display for readers
        </p>
      )
    ).toBeTruthy();
  });
  it('renders The Author card component in dark mode when user is following author', () => {
    const component = shallow(
      <AuthorCard
        image="./../src/assets/images/avatar.png"
        fullname="Firstname Lastname"
        handle="Lastma"
        bio="This would be a short summary of the users bio, for little interest
    display for readers"
        isFollowing={true}
        lightTheme={false}
      />
    );

    expect(
      component.contains(
        <p className="container-fluid author-bio small-text">
          This would be a short summary of the users bio, for little interest
          display for readers
        </p>
      )
    ).toBeTruthy();
  });
  it('renders The Author card component in light mode when user is following author', () => {
    const component = shallow(
      <AuthorCard
        image="./../src/assets/images/avatar.png"
        fullname="Firstname Lastname"
        handle="Lastma"
        bio="This would be a short summary of the users bio, for little interest
    display for readers"
        isFollowing={true}
        lightTheme={true}
      />
    );
    expect(
      component.contains(
        <p className="container-fluid author-bio small-text">
          This would be a short summary of the users bio, for little interest
          display for readers
        </p>
      )
    ).toBeTruthy();
  });
});
