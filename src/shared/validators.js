import { usersRef } from '@/shared/firebase';
import { helpers as vuelidateHelpers } from 'vuelidate/lib/validators';

export const uniqueUsername = value => {
  if (!vuelidateHelpers.req(value)) {
    return true;
  }
  return new Promise(resolve => {
    usersRef
      .where('lowerUsername', '==', value.toLowerCase())
      .get()
      .then(snap => {
        resolve(snap.empty);
      });
  });
};

export const uniqueEmail = value => {
  if (!vuelidateHelpers.req(value)) {
    return true;
  }
  return new Promise(resolve => {
    usersRef
      .where('email', '==', value.toLowerCase())
      .get()
      .then(snap => {
        resolve(snap.empty);
      });
  });
};
