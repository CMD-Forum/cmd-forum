import '@/app/(general)/ui/components/posts/post';

import { Metadata } from 'next';

import PostList from '@/app/(general)/ui/components/posts/post_list';
import { showDevelopmentWarning } from '@/flags';

import Alert, { AlertSubtitle, AlertTitle } from '../ui/components/new_alert';
 
export const metadata: Metadata = {
  title: 'Posts',
};

export default async function HomePage() {

  const devMsg = await showDevelopmentWarning();

  return (
    <main className="flex min-h-screen flex-col w-full">
      <div className="error flex flex-col w-full">
            <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
                <h1 className="header">Posts</h1>
            </div>
            <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6'>
              { devMsg &&
                <Alert type={"alert"} style={"subtle"} className={"mb-4"}>
                  <AlertTitle>Here be dragons!</AlertTitle>
                  <AlertSubtitle>This is a development version of Command - some things may not work as expected or may be unfinished.</AlertSubtitle>
                </Alert>              
              }
              <PostList />  
            </div>
        </div>
    </main>
  );
}
