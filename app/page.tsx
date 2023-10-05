'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'aws-amplify/auth';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';


type UserFormState = {
  username: string,
  password: string
}

export default function Home() {

  const router = useRouter()

  const [userForm,setUserForm] = useState<UserFormState>({
    username: '',
    password: ''
  })

  const handleSignIn = async () => {
    try {
      const response = await signIn({
        username: userForm.username,
        password: userForm.password
      })
      console.log(response)
      router.push('/dash')
     
    } catch (e) {
      console.log(e)
    } 
  }
  return (
    <main className="flex justify-center items-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Access your account.</CardDescription>
          </CardHeader>
          <CardContent>

            <div className='grid w-full items-center gap-4'>
              <div>
                <Input placeholder="email" onChange={(e) => setUserForm({...userForm,username: e.target.value})} />
              </div>

              <div>
                <Input placeholder="password" onChange={(e) => setUserForm({...userForm,password: e.target.value})} />
              </div>

              <div className='flex justify-between items-center'>
                <Button onClick={handleSignIn}>Sign In</Button>
                <Link className="button" href="/sign-up">Sign Up</Link>
              </div>
            </div>
            
          </CardContent>
        </Card>
    </main>
  )
}