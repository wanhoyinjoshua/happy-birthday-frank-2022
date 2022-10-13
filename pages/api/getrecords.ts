// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import {prisma} from "../../lib/prisma"
type Data = {
  status: any
}

export default async function checkUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const session =getSession(req,res)
    console.log(req.body)
    
    
    const getPost = await prisma.user.findUnique({
        where: {
          id: session.user.sub,
        },
        include: {
            History: true,
        },
      })

    if(getPost){
        res.status(200).json({ status: getPost })
    }
    else{
        res.status(200).json({ status: false })

    }
  
  
    
}


