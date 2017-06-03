const fetch = require('isomorphic-fetch');

module.exports = (event) => {
  const email = event.data.email;
  const query = JSON.stringify({query: `query {allCustomers(filter: {email: "${email}"}) {id}}`});
  const graphCoolEndpoint = 'https://api.graph.cool/simple/v1/cj2q45mbs06v40103q55dqfm4';

  return new Promise((resolve, reject) => {
    fetch(graphCoolEndpoint, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: query,
    })
      .then(response => response.json())
      .then(responseJson => {
        const customers = responseJson.data.allCustomers;

        if (customers.length > 0) {
          event.data.id = customer[0].id; // existing customer
        } else {
          event.data.id = ''; // new customer
        }

        resolve(event);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        reject({error: 'Could not connect to graphcool for allCustomers query'});
      });
  });
};
