import React,{useState,useEffect} from 'react';
import axios from "axios"
import { useUser, getSession } from '@auth0/nextjs-auth0';
import Link from "next/link"
const History = () => {
    const user =useUser()
    const [history,setHistory]=useState<any>([])
    useEffect(() => {

        if(user){
          
          fetch(`/api/getrecords/`)
          .then(response => response.json())
          // 4. Setting *dogImage* to the image url that we received from the response above
          .then(data1 => setHistory(data1.status.History))
  
            
        }else{
          console.log("getout")
  
    
        }
            
    },[])
  return (
    <div>
        <Link href="/Example">Compute</Link>
        <Link href="/api/auth/logout">Logout</Link>
        <table>
            <tbody>
        <tr>
    <th>Initial Value</th>
    <th>years</th>
    <th>Value increase</th>
    <th>Value decrease</th>
    <th>Date of creation</th>
  </tr>{console.log(history)}
        {history&&history.map(item=>
        <tr key={item.id}>
           {JSON.parse(item.content).map(list=><th key={list}>{list}</th>)}
            <th>{item.createdAt}</th>
        </tr>
        
        )}

</tbody>

        </table>
        



    </div>

  )
}

export default History