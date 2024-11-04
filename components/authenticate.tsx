import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { FcGoogle } from "react-icons/fc"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const Authenticate = () => {
  const supabase = useSupabaseClient()
  const { toast } = useToast()
  
  const signInWithGoogle = async () => {
    const getURL = () => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/'
      // Make sure to include `https://` when not localhost.
      url = url.startsWith('http') ? url : `https://${url}`
      // Make sure to include a trailing `/`.
      url = url.endsWith('/') ? url : `${url}/`
      return url
    }
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: getURL(),
      },
    })

    if (error) {
        toast({
            title: "🔴 Something went wrong",
            description: "Please try again.",
        })
    }
  }

  return (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger asChild>
        <></>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Authenticate with Google</AlertDialogTitle>
          <AlertDialogDescription>To continue, please sign in with your Google account.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
            <Button variant="outline" className="w-full gap-2" onClick={() => signInWithGoogle()}>
            <FcGoogle />
            Sign in with Google
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Authenticate
