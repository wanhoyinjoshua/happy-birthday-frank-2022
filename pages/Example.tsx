import React,{useState,useEffect} from 'react';
import axios from "axios"
import "chart.js/auto"
import {Line} from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import Link from "next/link"
import { useUser, getSession } from '@auth0/nextjs-auth0';
const data:ChartData<"line", number[], string> = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default function Example (){

  const [income,setIncome]=useState("1000");
    const [years,setYear]=useState("214");
    const [valueincrease,setIncrease]=useState("10");
    const [valuedecrease,setDecrease]=useState("2");
    const[data,setData]=useState<any>("nothing")
    const[timevector,setTimevector]=useState([])
    const[moneyvector,setMoneyvector]=useState([])
    const [stripeid,setStripeid]=useState("")
    const { user } = useUser();
    useEffect(() => {

      if(user){
        console.log(JSON.stringify(user.sub))
        console.log(stripeid)
        fetch(`/api/checkuser/${user.sub}`)
        .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
        .then(data1 => data1.user)
        .then (data=>setStripeid(JSON.stringify(data.stripecustomerid)))

          
      }else{
        console.log("getout")

  
      }
          
  },[user])

    async function calculate (){
        var bodyFormData = new FormData();
        bodyFormData.append('income', income);
        bodyFormData.append('years', years);
        bodyFormData.append('valueincrease', valueincrease);
        bodyFormData.append('valuedecrease', valuedecrease);
        //defining the api, can be hosted anywhere, you can do data manipualtion inside this 
        //microservice and return data to display
        //i am sure you can manipulate data with js on the front end as well
        //but mayeb the more cpu intensive calculations should be preserved for the backend
        //and obviously you need to handle authtication so this woould be a nice way to
        //controll access to services by controlling access to api enpoints.

        const result = await axios.post("https://frankdemobd.33ksrb5narsei.ap-southeast-2.cs.amazonlightsail.com/calculations", bodyFormData )
        
        console.log(result)
          
          var start = 0;
          var end = parseInt(years);
          setTimevector(Array(end - start + 1).fill(start).map((x, y) => x + y));
          function myFunction(item) {
            Math.round(item)
          }
          
          setMoneyvector(result.data)

          
         setData(result)
         const save = await axios.post(`/api/save/${user.sub}`, {income:income,years:years,valuedecrease:valuedecrease,valueincrease:valueincrease} )


  
  }
   
  const graphdata:ChartData<"line", number[], string>= {
    labels: timevector,
    
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: moneyvector
      }
    ]
  };

 
    return (
      <>
  


      
        <div>
          <div>

          </div>
          <div className="  inline-flex items-center -space-x-px rounded-md text-xs">
  
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
{stripeid!=`""`&&    <form action="/api/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          
        />
        <button className="bg-orange-200 rounded-r-md border px-5 py-3 font-medium hover:z-10 hover:bg-orange-100 focus:z-10 focus:border-indigo-600 focus:outline-none active:opacity-75" id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>}

<br></br>
<br></br>

              
    <div >
      <div>
      <label className="block text-xs font-medium text-gray-700">income:</label>
      <input className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" type="number" required value={income} onChange={(e)=>{setIncome(e.target.value)}} />
      
      </div>
      <div >
    <label >years:</label>
      <input type="number" required value={years} onChange={(e)=>{setYear(e.target.value)}} />
      
      </div>
      <div >
    <label >Growth rate per annum (%):</label>
      <input type="number" required value={valueincrease} onChange={(e)=>{setIncrease(e.target.value)}} />
      
      </div>
      <div >
    <label >Discount rate per annum (%):</label>
      <input type="number" required value={valuedecrease} onChange={(e)=>{setDecrease(e.target.value)}} />
          
    <button className="rounded-l-md border px-5 py-3 font-medium hover:z-10 hover:bg-gray-50 focus:z-10 focus:border-indigo-600 focus:outline-none active:opacity-75" onClick={calculate}>Calculate</button>
      
      </div>

      </div>
        <br>
        </br>
        <br>
        </br>
        <h2>Graph</h2>
        <div className='max-w-screen-md'>
        <Line
          data={graphdata}
          width={400}
          height={400}
        />
        </div>

      



 
 

      </div>
      </>
    );
  
};