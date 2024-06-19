import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div  className='flex gap-y-6 flex-col items-center justify-center h-screen'>
      <h1 className='text-5xl font-bold'>University Students Portfolio</h1>
      <Button asChild size={'lg'}>
        <Link href={'/home'}>Get Started</Link>
      </Button>
    </div>
    
  )
}

export default Home