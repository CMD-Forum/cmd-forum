import '@/app/ui/components/posts/post_full'
import FullPost from '@/app/ui/components/posts/post_full'

export default function PostView({ params }: { params: { id: number } }) {
  return (
    <main className="flex min-h-screen flex-col p-24 w-full">
      <p>{ params.id }</p>
      <FullPost title='test' author={1} community='meta' upvotes={1} downvotes={1} ratio='50%' submitted='5-12-23' subtitle='test' body=''></FullPost>
    </main>
  )
}
