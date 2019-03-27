export const getRequest = (payload) => {
  const {name} = payload;
  return { type: `${name.toUpperCase()}_REQUEST`, payload}
};

export const clearError = (payload) => {
  return { type: 'CLEAR_ERROR', payload}
};

export const clearPassword = (payload) => {
  return { type: 'CLEAR_PASSWORD'}
};
