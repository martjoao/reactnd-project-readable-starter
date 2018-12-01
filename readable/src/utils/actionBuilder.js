export const action = (type, payload = {}) => ({
  type, payload,
});

export const successAction = (type, payload = {}) => ({
  type, payload: { ...payload, error: false },
});

export const errorAction = type => ({
  type,
  payload: {
    error: true,
  },
});
