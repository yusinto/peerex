const fetch = require('isomorphic-fetch');
const stripe = require('stripe')('sk_test_gidPHOtIgje94G6SxfgDUyFJ');

module.exports = (event) => {
  const id = event.data.id;
  const email = event.data.email;
  const loginType = event.data.loginType;
  const loginToken = event.data.loginToken;
  const query = JSON.stringify({query: `query {allCustomers(filter: {email: "${email}"}) {id}}`});
  const graphCoolEndpoint = 'https://api.graph.cool/simple/v1/cj2q45mbs06v40103q55dqfm4';

  const createGraphCoolCustomer = (email, loginType, loginToken, stripeCustomerId) => {
    const createCustomer = JSON.stringify({
      query: `
    mutation {
      createCustomer(
        loginType: ${loginType},
        loginToken: "${loginToken}",
        email: "${email}",
        stripeCustomerId: "${stripeCustomerId}"
      )
      {
        id
        stripeCustomerId
      }
    }`
    });
    console.log('creating graphcool customer now: ' + stripeCustomerId);

    return fetch(graphCoolEndpoint, {
      headers: {'content-type': 'application/json'},
      method: 'POST',
      body: createCustomer,
    });
  };

  const createStripeCustomer = (email) => {
    console.log(`creating stripe cust: ${email}`);
    return new Promise((resolve, reject) => {
      stripe.customers.create({email},
        (err, customer) => {
          if (err) {
            console.log('error creating stripe customer: ' + JSON.stringify(err));
            reject(err);
          } else {
            console.log('successfully created stripe customer: ' + customer.id);
            resolve(customer.id);
          }
        }
      );
    });
  };

  return new Promise((resolve, reject) => {
    if (!id) { // new customer
      createStripeCustomer(email)
        .then(stripeCustomerId => createGraphCoolCustomer(email, loginType, loginToken, stripeCustomerId))
        .then(response => response.json())
        .then(responseJson => {
          console.log(`Successfully created graphcool customer: ${JSON.stringify(responseJson)}`);
          resolve(event);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    } else {
      console.log(`updating existing customer`);
      resolve(event);
    }
  });
};
