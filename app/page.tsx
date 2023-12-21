import Link from 'next/link';
import Dropdown from '@/app/ui/components/dropdown';
import '@/app/ui/components/posts/post';
import PostList from './ui/components/posts/post_list';
import { CardPost } from '@/app/ui/components/posts/post';

export default async function Home(this: any) {

  return (

    <main className="flex min-h-screen flex-col w-full">

      <div className="error flex flex-col gap-4 w-full">

            <div className="flex flex-col">

                <h1 className="text-3xl font-sans font-bold antialiased w-full">Trending</h1>
                <p className="text-gray-300 font-bold antialiased w-full">Popular posts recently</p>   

            </div>
            
            <div className="flex flex-row gap-2 w-full">

                <Link className='navlink-full w-full' href='/account/posts'>My Posts</Link> 
                <Dropdown items={[

                  { text: 'Hot', link: '/posts/hot', icon: 'FireIcon' },
                  { text: 'New', link: '/posts/new', icon: 'NewspaperIcon' },
                  { text: 'Rising', link: '/posts/rising', icon: 'ChevronDoubleUpIcon' },
                  { text: 'Old', link: '/posts/old', icon: 'ArchiveBoxIcon' },

                ]} btn_title="Sort Posts" disabled={true}/>

            </div>

            {/*<CardPost title='test' community='meta' author='test' upvotes={5} downvotes={2} ratio='25%' submitted='Yesterday, 20:42 GMT' subtitle='okay' link='okay' />*/}
            <PostList />

        </div>

    </main>

  )

}
