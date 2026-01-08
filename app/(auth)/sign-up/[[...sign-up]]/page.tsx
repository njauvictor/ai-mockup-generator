import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex  w-full items-center justify-center pt-28 md:pt-48">
      <SignUp />
    </div>
  )
  
}