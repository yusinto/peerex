import keyMirror from 'keymirror';

export const Actions = keyMirror({
  UPDATE_LOGIN: null,
});

export function updateLogin(data) {
  return {
    type: Actions.UPDATE_LOGIN,
    data,
  };
}
