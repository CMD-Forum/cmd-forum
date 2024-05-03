import '@/app/(general)/ui/components/posts/post';
import PostList from '@/app/(general)/ui/components/posts/post_list';

export default function HomePage() {

  return (

    <main className="flex min-h-screen flex-col w-full">

      <div className="error flex flex-col w-full">

            <div className="flex flex-col border-b-1 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">

                <h1 className="header">Posts</h1>

            </div>

            <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6'>
              <PostList />  
            </div>

        </div>

    </main>

  );

}
