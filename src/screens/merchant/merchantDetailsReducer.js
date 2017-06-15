import {Actions} from './merchantDetailsActions';

const initialState = {
  sourceId: '',
  brand: '',
  last4: '',
  transactionId: '',
  pin: '',
};

export default function reducer(state = initialState, action = {}) {
  const {type, data} = action;

  switch (type) {
    case Actions.UPDATE_MERCHANT_DETAILS:
      return {
        ...state,
        ...data,
      };

    default:
      return state;
  }
}
