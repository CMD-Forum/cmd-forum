import '@/app/(general)/ui/components/posts/post';
import PostList from '@/app/(general)/ui/components/posts/post_list';
import Alert, { AlertSubtitle, AlertTitle } from '../ui/components/new_alert';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Posts - CMD',
};

export default function HomePage() {

  return (

    <main className="flex min-h-screen flex-col w-full">

      <div className="error flex flex-col w-full">

            <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
                <h1 className="header">Posts</h1>
            </div>

            <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6'>
              <Alert type={"notice"} style={"subtle"} className={"mb-4"}>
                <AlertTitle>Notice to all users.</AlertTitle>
                <AlertSubtitle>This is a development version of Command - some things may not work as expected or may be unfinished.</AlertSubtitle>
              </Alert>
              
              <PostList />  
            </div>

        </div>

    </main>

  );

}
