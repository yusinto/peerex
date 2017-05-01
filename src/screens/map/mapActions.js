import keyMirror from 'keymirror';

export const Actions = keyMirror({
  UPDATE_MAP: null,
});

export function updateMap(data) {
  return {
    type: Actions.UPDATE_MAP,
    data,
  };
}
