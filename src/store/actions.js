import { firestore } from '@/shared/firebase';

export const fetchItem = async ({ state, commit }, { resource, id }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection(resource)
      .doc(id)
      .get()
      .then(item => {
        const itemData = item.data();
        commit('setItem', { item: itemData, id: id, resource });
        resolve(state[resource].items[id]);
      })
      .catch(error => {
        reject(error);
      });
  });
};
