import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center md:pt-24">
      <SignIn />
    </div>
  )
}   