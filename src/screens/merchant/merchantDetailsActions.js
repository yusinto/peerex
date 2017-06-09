import keyMirror from 'keymirror';

export const Actions = keyMirror({
  UPDATE_MERCHANT_DETAILS: null,
});

export function updateMerchantDetails(data) {
  return {
    type: Actions.UPDATE_MERCHANT_DETAILS,
    data,
  };
}
