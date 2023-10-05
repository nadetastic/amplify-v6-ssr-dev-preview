"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { confirmSignUp, signUp } from "aws-amplify/auth";
import Link from "next/link";
import { useState } from "react";

type UserFormState = {
    username: string,
    password: string,
    code?: string
  }


export default function Page() {

    const [userForm,setUserForm] = useState<UserFormState>({
        username: '',
        password: ''
    })

    const handleSignUp = async () => {
        try {
            const response = await signUp({
                username: userForm.username,
                password: userForm.password
            })

            console.log(response)
        } catch(e){
            console.log(e)
        }
    }

    const handleConfrimSignUp = async () => {
        try {
            const response = await confirmSignUp({
                username: userForm.username,
                confirmationCode: userForm.code!
            })
            console.log(response)
        } catch(e){
            console.log(e)
        }
    }
    return (

       <div className="flex justify-center items-center min-h-screen">

        <Tabs defaultValue="signup">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="confirm">Complete SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
            <Card className="w-[350px]">
         <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account.</CardDescription>
         </CardHeader>
         <CardContent>
          <div className='grid w-full items-center gap-4'>
          <div>
            <Input placeholder="email" onChange={(e) => setUserForm({...userForm,username: e.target.value})} />
          </div>

          <div>
            <Input placeholder="password" onChange={(e) => setUserForm({...userForm,password: e.target.value})} />
          </div>

          <div className="flex justify-between items-center">
            <Button onClick={handleSignUp}>Sign Up</Button>
            <Link href="/">Sign In</Link>
          </div>
          </div>
         </CardContent>
        </Card>     
            </TabsContent>
            <TabsContent value="confirm">
            <Card className="w-[350px]">
         <CardHeader>
          <CardTitle>Complete Sign Up</CardTitle>
          <CardDescription>Confirm your new account.</CardDescription>
         </CardHeader>
         <CardContent>
          <div className='grid w-full items-center gap-4'>
          <div>
            <Input placeholder="email" onChange={(e) => setUserForm({...userForm,username: e.target.value})} />
          </div>

          <div>
            <Input placeholder="code" onChange={(e) => setUserForm({...userForm,code: e.target.value})} />
          </div>

          <div className="flex justify-between items-center">
            <Button onClick={handleConfrimSignUp}>Confirm</Button>
           
          </div>
          </div>
         </CardContent>
        </Card>     
            </TabsContent>
        </Tabs>
       </div>
    )
}


