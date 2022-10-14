// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import {prisma} from "../../../lib/prisma"
type Data = {
  user: any
}

export default async function checkUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const session =getSession(req,res)
    console.log(session)
    console.log(req.query.user)
    if(session?.user.sub==req.query.sub){
     const duplicate= await prisma.user.findUnique({
        where:{
          id:session?.user.sub
        }


      })

      if(duplicate){

        res.status(200).json({ user: duplicate })



      }
      else{

        const newUser=await prisma.user.create(
          {
            
              data:{
                  id: session?.user.sub,
                  username:session?.user.email,
                  member:0,
                  stripecustomerid:"",

                  
                 

              }
            }

          
        )

        res.status(200).json({ user: newUser })
        

      }


    }else{
      res.status(404).json({ user: null })

    }
  
    
}


