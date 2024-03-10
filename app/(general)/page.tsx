import '@/app/(general)/ui/components/posts/post';
import PostList from './ui/components/posts/post_list';

export default function HomePage() {

  return (

    <main className="flex min-h-screen flex-col w-full p-6 mt-6">

      <div className="error flex flex-col w-full">

            <div className="flex flex-col">

                <h1 className="header">Trending</h1>
                <p className="text-gray-300 font-medium antialiased w-full">Popular posts recently</p>   

            </div>

            <hr className="border-border mb-0 mt-4" />

            <div className='flex flex-col'>
              <PostList />  
            </div>

        </div>

    </main>

  )

}
