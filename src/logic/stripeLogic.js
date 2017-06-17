import {LAMBDA_API} from '../constants';

export const createStripeSource = async ({cardNumber, cvv, expiryMonth, expiryYear}) => {
  try {
    console.log(`createStripeSource: email: ${this.props.email}, stripeCustomerId: ${this.props.stripeCustomerId},
      ${cardNumber} ${cvv} ${expiryMonth} ${expiryYear}`);

    const result = await fetch(`${LAMBDA_API}/create-source`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber,
          cvc: cvv,
          expiryMonth,
          expiryYear,
          email: this.props.email,
          stripeCustomerId: this.props.stripeCustomerId,
        }),
      }
    );

    let resultJson = await result.json();
    console.log(`successfully created stripe source! ${JSON.stringify(resultJson)}`);
    return resultJson;
  } catch (err) {
    console.log(`failed to create stripe source: ${err}`);
  }
};
