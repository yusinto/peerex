const fetch = require('isomorphic-fetch');
const stripe = require('stripe')('sk_test_gidPHOtIgje94G6SxfgDUyFJ');

module.exports = (event) => {
  const email = event.data.email;
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

  const createStripeCustomer = email => {
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
          createStripeCustomer(email)
            .then(stripeCustomerId => {
              event.data.stripeCustomerId = stripeCustomerId;
              resolve(event);
            })
            .catch(error => {
              console.log(JSON.stringify(error));
              reject(error);
            });
        } else {
          event.data._id = customers[0].id;
          event.data.stripeCustomerId = customers[0].stripeCustomerId;
          resolve(event);
        }
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        reject({error: 'Could not connect to graphcool for allCustomers query'});
      });
  });
};
