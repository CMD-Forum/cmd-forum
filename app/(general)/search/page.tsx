import SearchBar from '../ui/components/search/searchbar';
import SearchResults from '../ui/components/search/searchresults';

export default function Search({
    searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    type?: string;
  };
}) {

    const query = searchParams?.query || '';
    const type = searchParams?.type || 'post';
    const currentPage = Number(searchParams?.page) || 1;

    return (

        <div className='w-full m-auto flex-row gap-2 px-5 py-5 rounded-md facebookTheme:rounded-none bg-[#131313] facebookTheme:bg-white'>

            <div className="flex flex-col">

                <h1 className="header">Search</h1>
                <p className="text-gray-300 font-bold antialiased w-full">Search the database for content you want.</p>   

            </div>

            <hr className='border-b-[1px] border-zinc-900 facebookTheme:border-[#b3b3b3] mt-2 mb-3.5' />

            <SearchBar />   

            <hr className='border-b-[1px] border-zinc-900 facebookTheme:border-[#b3b3b3] mt-2 mb-3.5' />

            <SearchResults query={query} currentPage={currentPage} type={type}/>

        </div>

    )

}