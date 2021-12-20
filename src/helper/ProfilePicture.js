import _ from 'lodash';
import DefaultProfilePicture from '../data/images/alpaca-logo-mini.svg';

export const getProfilePictureUrl = (profilePicture = null) => {
  if (!_.isEmpty(profilePicture)) {
    return profilePicture;
  }

  return DefaultProfilePicture;
};
