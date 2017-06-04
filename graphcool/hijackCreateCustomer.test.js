import 'react-native';
import React from 'react';
import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import hijack from 'hijackCreateCustomer';

it('renders correctly', () => {
  const event = {
    data: {
      email: 'yus@bla.com',
      loginType: 'Facebook',
      loginToken: 'token',
    }
  };
  const promise = hijack(event);
});
