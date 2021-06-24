import express from 'express';


const router = express.Router();

import {requireSignin} from '../middlewares'

import {createConnectAccount, getAccountStatus, getAccountBalance, stripeSessionId, StripeSuccess } from '../controllers/stripe';


// import { getAccountStatus } from '../../client/src/actions/stripe';


router.post('/create-connect-account', requireSignin, createConnectAccount);

router.post("/get-account-status", requireSignin, getAccountStatus);

router.post("/get-account-balance", requireSignin, getAccountBalance);

router.post("/stripe-session-id", requireSignin, stripeSessionId);

router.post("/stripe-success", requireSignin, StripeSuccess);

module.exports = router;