import { Toaster } from "@/components/ui/toaster"



import './globals.css'
import { Route,Routes } from 'react-router-dom'
import Signinform from './_auth/forms/Signinform'
import Signupform from './_auth/forms/Signupform'
import { Allusers, Createpost, Editpost, Explore, Home, Postdetails, Profile, Saved, Updateprofile } from './_root/pages'
import Authlayout from './_auth/Authlayout'
import Rootlayout from './_root/Rootlayout'

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/*public */}
            <Route element ={<Authlayout/>} >
              <Route path='/sign-in' element={<Signinform />} />
              <Route path='/sign-up' element={<Signupform />} />
            </Route>
            
            {/*private */}
            <Route element= {<Rootlayout/>}>
              <Route index element={<Home/>} />
              <Route path="/explore" element={<Explore/>} />
              <Route path="/saved" element={<Saved/>} />
              <Route path="/all-users" element={<Allusers/>} />
              <Route path="/create-post" element={<Createpost/>} />
              <Route path="/update-post/:id" element={<Editpost/>} />
              <Route path="/posts/:id" element={<Postdetails/>} />
              <Route path="/profile/:id/*" element={<Profile/>} />
              <Route path="/update-profile/:id" element={<Updateprofile/>} />
            </Route>    
        </Routes>
        <Toaster />

    </main>
  )
}

export default App