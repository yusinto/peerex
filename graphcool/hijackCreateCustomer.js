// HACK: This function completely hijacks the createCustomer mutation to implement our own business logic.
// Trigger this function on create of customer at PRE-WRITE step.
// Check if customer email exists. If yes, manually update the customer.
// If not, manually create the customer i.e. create stripe customer, create graphcool customer.
// After both cases, abort with custom error saying we have overriden the original create request with our manual
// create/update logic.
const fetch = require('isomorphic-fetch');
const stripe = require('stripe')('sk_test_gidPHOtIgje94G6SxfgDUyFJ');

module.exports = (event) => {
  const email = event.data.email;
  const loginType = event.data.loginType;
  const loginToken = event.data.loginToken;
  const query = JSON.stringify({
    query: `
    query {
      allCustomers(filter: {email: "${email}"})
      {
        id
        stripeCustomerId
        loginType
        loginToken
        email
      }
    }
  `});
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
        loginType
        loginToken
        email
      }
    }`
    });
    console.log(`creating graphcool customer now: ${stripeCustomerId}`);

    return fetch(graphCoolEndpoint, {
      headers: {'content-type': 'application/json'},
      method: 'POST',
      body: createCustomer,
    });
  };

  const updateGraphCoolCustomer = (id, loginToken) => {
    const updateCustomer = JSON.stringify({
      query: `
    mutation {
      updateCustomer(
        id: "${id}",
        loginToken: "${loginToken}",
      )
      {
        id
        stripeCustomerId
        loginType
        loginToken
        email
      }
    }`
    });
    console.log(`updating graphcool customer now: ${id}`);

    return fetch(graphCoolEndpoint, {
      headers: {'content-type': 'application/json'},
      method: 'POST',
      body: updateCustomer,
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
    fetch(graphCoolEndpoint, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: query,
    }).then(response => response.json())
      .then(responseJson => {
        const customers = responseJson.data.allCustomers;

        if (customers.length === 0) {
          console.log(`creating new customer`);
          createStripeCustomer(email)
            .then(stripeCustomerId => createGraphCoolCustomer(email, loginType, loginToken, stripeCustomerId))
            .then(response => response.json())
            .then(responseJson => {
              console.log(`Successfully created graphcool customer: ${JSON.stringify(responseJson)}`);
              // HACK: abort pipeline here after creating/updating customer to prevent the original request
              // from doing anything else!
              reject({error: 'customer created manually'});
            })
            .catch(error => {
              console.log(JSON.stringify(error));
              reject(error);
            });
        } else {
          const id = customers[0].id;
          console.log(`updating existing customer id: ${id}`);
          updateGraphCoolCustomer(id, loginToken)
            .then(response => response.json())
            .then(responseJson => {
              console.log(`Successfully updated graphcool customer: ${JSON.stringify(responseJson)}`);
              // HACK: abort pipeline here after creating/updating customer to prevent the original request
              // from doing anything else!
              reject({error: 'customer created manually'});
            })
            .catch(error => {
              console.log(JSON.stringify(error));
              reject(error);
            });
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        reject({error: 'Could not connect to graphcool for allCustomers query'});
      });
  });
};
