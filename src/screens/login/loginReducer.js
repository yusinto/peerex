import {Actions} from './loginActions';

const initialState = {
  email: '',
  loginToken: '',
  loginType: '',
  stripeCustomerId: '',
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
