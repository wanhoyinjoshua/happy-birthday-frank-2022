// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getStripe from "../../lib/get-stripejs"
const stripe = require('stripe')('sk_test_51LhnzvL0LOsjH7ujdI5lAOKAF4CER1vuGYWOrwdX2jGBkkuJq3w5uqXrq4oA6oB8eSewV3bD59BvN2rZa1FMwcvt00Ht7uWFjv');
const YOUR_DOMAIN =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/Example'
      : "https://happy-birthday-frank-2022.vercel.app/Example";


import { getSession } from '@auth0/nextjs-auth0';
import {prisma} from "../../lib/prisma"
type Data = {
  status: any
}

export default async function checkoutSession(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { session_id } = req.body;
    const userinfo =getSession(req,res)
    const userdatabase= await prisma.user.findUnique({
      where:{
        id:userinfo?.user.sub
      }


    })
    /*
  const checkoutSession = await stripe.checkout.sessions.retrieve(userinfo.user.sub);
    */
  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: userdatabase.stripecustomerid,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
}