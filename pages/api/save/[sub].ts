// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import {prisma} from "../../../lib/prisma"
type Data = {
  status: any
}

export default async function checkUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const session =getSession(req,res)
    console.log(req.body)
    
    
   const save= await prisma.History.create({
       
    data:{

        authorId :  session?.user.sub   ,
        content  :  JSON.stringify([req.body.income,req.body.years,req.body.valuedecrease,req.body.valueincrease]) 


    }
    })

    if(save){
        res.status(200).json({ status: true })
    }
    else{
        res.status(200).json({ status: false })

    }
  
  
    
}


