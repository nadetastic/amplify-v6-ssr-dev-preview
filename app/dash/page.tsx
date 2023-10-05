'use client'

import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

const Dashboard = () => {

    const router = useRouter()

    const handleSignOut = async () => {
        try {
            await signOut()
            console.log('signed out')
            router.push('/')
        } catch(e){
            console.log(e)
        }
    }

    const handleCurrentUser = async () => {
        try {
            const response = await getCurrentUser()
            console.log(response)
        } catch(e){
            console.log(e)
        }
    }

    return ( 
        <div className="flex justify-center items-center min-h-screen">
            <div>
                <p>Your are signed in.</p>
                <Button onClick={handleCurrentUser}>Current User</Button>
                <Button onClick={handleSignOut}>Sign Out</Button>
            </div>
        </div>
     );
}
 
export default Dashboard;