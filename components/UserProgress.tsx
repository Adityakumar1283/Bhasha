import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { InfinityIcon } from 'lucide-react';

type Props= {
    activeCourse:{ ImageSrc:string, title:string }
    hearts:number
    points:number
    hasSubscribed:boolean
}

export const UserProgress = ({activeCourse,points,hearts,hasSubscribed}:Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full ">
      <Link href="/courses">
      <Button>
        <Image src={ activeCourse.ImageSrc} alt={activeCourse.title}
        className='rounded-md  border'
        width={32}
        height={32} 
        />
      </Button>
      </Link>
      <Link href={"/shop"}>
      <Button variant={"ghost"} className='text-orange-500 hover:bg-orange-100'>
        <Image src="/points.svg" height={28} width={28} alt="points" className=' mr-2' />
        {points}
      </Button>
      </Link>
      <Link href={"/shop"}>
      <Button variant={"ghost"} className='text-rose-500 hover:bg-rose-200'>
        <Image src="/heart.svg" height={22} width={22} alt="Hearts" className=' mr-2' />
        {hasSubscribed? <InfinityIcon className=' h-4 w-4 stroke-[3]'/> : hearts}
      </Button>
      </Link>
    </div>
  )
}


