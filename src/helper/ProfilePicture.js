import _ from 'lodash';
import DefaultProfilePicture from '../data/images/wallfair-profile.png';

export const getProfilePictureUrl = (profilePicture = null) => {
  if (!_.isEmpty(profilePicture)) {
    return profilePicture;
  }

  return DefaultProfilePicture;
};
