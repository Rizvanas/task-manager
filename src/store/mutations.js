import Vue from 'vue';

export const setItem = (state, { item, id, resource }) => {
  item['.key'] = id;
  Vue.set(state[resource].items, id, item);
};

export const deleteItem = (state, { id, resource }) => {
  Vue.delete(state[resource].items, id);
};
