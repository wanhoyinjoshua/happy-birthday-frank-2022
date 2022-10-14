// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getStripe from "../../lib/get-stripejs"

const stripe = require('stripe')('sk_test_51LhnzvL0LOsjH7ujdI5lAOKAF4CER1vuGYWOrwdX2jGBkkuJq3w5uqXrq4oA6oB8eSewV3bD59BvN2rZa1FMwcvt00Ht7uWFjv');

const YOUR_DOMAIN= "http://localhost:3000/subscription/84848"||"https://happy-birthday-frank-2022.vercel.app/subscription/84848"
import { getSession } from '@auth0/nextjs-auth0';
import {prisma} from "../../lib/prisma"
type Data = {
  status?: any
  user:any
}

export default async function checkoutSession(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    //get info about the customer
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    });

    const userinfosession =getSession(req,res)
    
    
     const user= await prisma.user.findUnique({
        where:{
          id:userinfosession?.user.sub
          
        }


      })
      var customer;
      if(user.stripecustomerid==undefined||user.stripecustomerid==""){
        //create customer
        var customer = await stripe.customers.create({
            description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
          });
        //now create it in database

        const updateuser =await  prisma.user.update({
            where: {
                id: userinfosession?.user.sub
            },
            data: {
                stripecustomerid: customer.id
            }
        })

       const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: prices.data[0].id,
            // For metered billing, do not pass quantity
            quantity: 1
            
            
    
          },
        ],
        mode: 'subscription',
        customer:updateuser.stripecustomerid,
        success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        subscription_data: {    
          trial_period_days: 7,
        },
      });
          
 
    
      res.redirect(303, session.url);


      }
      else{
        const session = await stripe.checkout.sessions.create({
          billing_address_collection: 'auto',
          line_items: [
            {
              price: prices.data[0].id,
              // For metered billing, do not pass quantity
              quantity: 1
              
              
      
            },
          ],
          mode: 'subscription',
          customer:user.stripecustomerid,
          success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${YOUR_DOMAIN}?canceled=true`,
          subscription_data: {    
            trial_period_days: 7,
          },
        });

        
    
      res.redirect(303, session.url);

      }




      
    

   

      

     
    

   
      
}