/*
 {
 "data": {
 "createdAt": "2017-06-04T11:04:16.695Z",
 "email": "yusinto@gmail.com",
 "id": "cj3ippj5pptre0132uozlcg29",
 "_id": "cj3ippj5pptre0132uozlcg29",
 "loginToken": "tokenX",
 "loginType": "Facebook",
 "stripeCustomerId": "stripeshit",
 "updatedAt": "2017-06-04T11:04:16.695Z"
 },
 "context": {
 "headers": {}
 }
 }
 */

const fetch = require('isomorphic-fetch');

module.exports = (event) => {
  const id = event.data._id;
  const loginToken = event.data.loginToken;
  const graphCoolEndpoint = 'https://api.graph.cool/simple/v1/cj2q45mbs06v40103q55dqfm4';

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

  return new Promise((resolve, reject) => {
    if (id) { // update
      console.log(`updating existing customer id: ${id}`);
      updateGraphCoolCustomer(id, loginToken)
        .then(response => response.json())
        .then(responseJson => {
          console.log(`Successfully updated graphcool customer: ${JSON.stringify(responseJson)}`);
          reject({error: 'fuckoff'});
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          reject(error);
        });
    } else { // create
      console.log(`creating graphcool customer: ${JSON.stringify(event)}`);
      resolve(event);
    }
  });
};
