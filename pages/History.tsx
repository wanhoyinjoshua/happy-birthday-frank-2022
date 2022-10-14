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
         <div className="  inline-flex items-center -space-x-px rounded-md text-xs">
    <button
    className="border px-5 py-3 font-medium hover:z-10 hover:bg-gray-50 focus:z-10 focus:border-indigo-600 focus:outline-none active:opacity-75"
    type="button"
  >
    <Link href="/Example">Calculate</Link>
  </button>
  <button
    className="rounded-l-md border px-5 py-3 font-medium hover:z-10 hover:bg-gray-50 focus:z-10 focus:border-indigo-600 focus:outline-none active:opacity-75"
    type="button"
  >
    <Link href="/History">See History</Link>
  </button>

  <button
    className="border px-5 py-3 font-medium hover:z-10 hover:bg-gray-50 focus:z-10 focus:border-indigo-600 focus:outline-none active:opacity-75"
    type="button"
  >
   <Link href="/subscription/dev">Subscriptions</Link>
  </button>

  <button
    className="bg-red-200 rounded-r-md border px-5 py-3 font-medium hover:z-10 hover:bg-red-50 focus:z-10 focus:border-indigo-600 focus:outline-none active:opacity-75"
    type="button"
  >
    <Link href="/api/auth/logout">Logout</Link>
  </button>

  
</div>
       
      <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600  ">
    <div className="h-full w-full">

        <div className="w-full px-5 mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Log</h2>
            </header>
            <div className="p-3 w-full">
                <div className="overflow-x-auto w-full">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Initial Value</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Years</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Value increase per annum</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Value decrease per annum</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Creation date</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                           
                        {history&&history.map(item=>
        <tr key={item.id}>
           {JSON.parse(item.content).map(list=><td className="p-2 whitespace-nowrap text-center" key={list}><div className="font-medium text-gray-800">{list}</div></td>)}
            <td className="p-2 whitespace-nowrap"><div className="font-medium text-gray-800">{item.createdAt}</div></td>
        </tr>
        
        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
   



    </div>

  )
}

export default History