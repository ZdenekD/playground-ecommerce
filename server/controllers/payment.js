import braintree from 'braintree';
import dotenv from 'dotenv';

dotenv.config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.PAYMENT_MERCHANT_ID,
    publicKey: process.env.PAYMENT_PUBLIC_KEY,
    privateKey: process.env.PAYMENT_PRIVATE_KEY,
});
const generate = (req, res) => {
    gateway.clientToken.generate({}, (error, data) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(data);
        }
    });
};

const payment = (req, res) => {
    const callback = (error, data) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(data);
        }
    };
    const nonce = req.body.paymentMethodNonce;
    const {amount} = req.body;

    gateway.transaction.sale({
        amount,
        paymentMethodNonce: nonce,
        options: {submitForSettlement: true},
    }, callback);
};

export {generate, payment};
