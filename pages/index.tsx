import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
export default function Home() {
  return (
    <div >
         <div className="bg-indigo-600 px-4 py-3 text-white">
  <p className="text-center text-sm font-medium">
    Happy Birthday frank and to Marija, wish you guys all the best cheers joshua

   
  </p>
  
</div>
<div className='text-center py-10'>
  
<a
  className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
  href="/download"
>
  <Link
  href="/api/auth/login"
    
    
  >
    <div className="block rounded-full bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
    Log in
    </div>

  </Link>
</a>
</div>

<div className='text-center py-10'>
<div
  className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl"
>
  <div className="block rounded-xl bg-white p-6 sm:p-8" >
    <div className="mt-16 sm:pr-8">
      <h5 className="text-xl font-bold text-gray-900">This design should be infinitely scalable wihtout spending too much time in stackoverflow </h5>
<h6><p>I had this all written up a while back so I might as well share it and deploy it online</p></h6>
<br></br>

      <p className="mt-2 text-sm text-gray-500">
        <a href='https://github.com/wanhoyinjoshua/happy-birthday-frank-2022'>Link to all the code</a><br></br>
        <a href='https://github.com/wanhoyinjoshua/happy-birthday-frank-2022'> https://github.com/wanhoyinjoshua/happy-birthday-frank-2022</a><br></br><br></br>

        I will destroy the aws resources (for the python calculation backend) after say 20 days
        <br></br>Tech stack
        <ul>
          <li>
          front end :
              React typescript 

          </li>
          <li>
            backend: next js (react backend framework), prisma (orm layer between server and database)<br></br>database i used planetscale which is an abstraction on top of aws Ec2 instances 

          </li>
          <li>Cost to run this stack:<br></br> 9AUD/ month (3 month free trial)to run machines on aws,<br></br>planetscale is free if reads and writes less than 1 billion(pretty generous),<br></br> I host the frontend on vercel which has a relatively genorus free tier as well<br></br>for authentication i use auth0 which has a limit of 1000 active users before charging you</li>

        </ul>
      </p>
    </div>
  </div>
</div>
</div>
    
 
    </div>
  )
}
