import {Actions} from './mapActions';

const initialState = {
  withdrawAmount: 30,
};

export default function reducer(state = initialState, action = {}) {
  const {type, data} = action;

  switch (type) {
    case Actions.UPDATE_MAP:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
}
