import {AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

export const getFacebookEmail = async (cb) => {
  const token = await AccessToken.getCurrentAccessToken();

  if(token) {
    console.log(`Found existing token: ${token.accessToken}`);
    const infoRequest = new GraphRequest('/me', {
        accessToken: token.accessToken,
        parameters: {fields: {string: 'email,name,first_name,middle_name,last_name'}}
      }, cb);
    new GraphRequestManager().addRequest(infoRequest).start();
  } else {
    console.log(`No existing facebook login token.`);
  }

  return token;
};
