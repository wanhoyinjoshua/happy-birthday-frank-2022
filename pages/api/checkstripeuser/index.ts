// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import {prisma} from "../../../lib/prisma"
type Data = {
  user: any
}

export default async function checkstripeUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session =getSession(req,res)
    console.log(session)
    console.log(req.query.user)
   
     const user= await prisma.user.findUnique({
        where:{
          id:session?.user.sub
          
        }


      })

      if(user.stripecustomerid!=null||user.stripecustomerid!=""){
        //then say it exists 
        res.status(200).json({ customerid: user.stripecustomerid })



      }
      else{

       

          
        

        res.status(200).json({ user: false })
        

      }


    
  
    
}


