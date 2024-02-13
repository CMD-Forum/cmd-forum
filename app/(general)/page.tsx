import Link from 'next/link';
import Dropdown from '@/app/(general)/ui/components/dropdown';
import '@/app/(general)/ui/components/posts/post';
import PostList from './ui/components/posts/post_list';
import { CardPost } from '@/app/(general)/ui/components/posts/post';

export default async function Home(this: any) {

  return (

    <main className="flex min-h-screen flex-col w-full">

      <div className="error flex flex-col w-full">

            <div className="flex flex-col">

                <h1 className="header">Trending</h1>
                <p className="text-gray-300 font-bold antialiased w-full">Popular posts recently</p>   

            </div>

            <hr className="border-border facebookTheme:border-[#b3b3b3] mb-4 mt-4" />

            {/*<CardPost title='test' community='meta' author='test' upvotes={5} downvotes={2} ratio='25%' submitted='Yesterday, 20:42 GMT' subtitle='okay' link='okay' />*/}
            <div className='flex flex-col gap-4'>
              <PostList />  
            </div>

        </div>

    </main>

  )

}
