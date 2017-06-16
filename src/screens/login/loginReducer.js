import {Actions} from './loginActions';

const initialState = {
  id: '',
  email: '',
  loginType: '',
  stripeCustomerId: '',
  sources: [], // source: {sourceId, last4, brand}. The first source is the default.
};

export default function reducer(state = initialState, action = {}) {
  const {type, data} = action;

  switch (type) {
    case Actions.UPDATE_LOGIN:
      return {
        ...state,
        ...data,
      };

    default:
      return state;
  }
}
