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

      <div className="error flex flex-col w-full p-6">

            <div className="flex flex-col">

                <h1 className="header">Search</h1>
                <p className="text-gray-300 font-bold antialiased w-full">Find that post you liked</p>   

            </div>

            <hr className="border-border facebookTheme:border-[#b3b3b3] mb-4 mt-4" />

            <SearchBar />

            <hr className='border-border facebookTheme:border-[#b3b3b3] mb-4 mt-4' />

            <div className='flex flex-col gap-4'>
                {query ?
                
                    <>
                        <SearchResults query={query} currentPage={currentPage} type={type} />  
                        <h1 className="text-gray-300 font-bold antialiased w-fit m-auto">Looks like you&apos;ve reached the end.</h1>                    
                    </>

                :
                    <h1 className="text-gray-300 font-bold antialiased w-fit m-auto">Search for results to show</h1>
                }
            </div>

        </div>

        

    )

}