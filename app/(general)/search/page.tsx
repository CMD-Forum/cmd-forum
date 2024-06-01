import { ArrowTrendingUpIcon, BoltIcon, ChartBarIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import Dropdown, { DropdownLink } from '../ui/components/dropdown/dropdown';
import SearchBar from '../ui/components/search/searchbar';
import SearchResults from '../ui/components/search/searchresults';
import Link from 'next/link';

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

      <div className="error flex flex-col w-full">

            <div className="flex flex-col border-0 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48 bg-card mt-8 md:mt-0">
                <h1 className="header">Search</h1>
                <p className="subtitle">Find that post you liked.</p>   
            </div>

            <div className='px-6 flex flex-col md:flex-row gap-2 max-w-[70rem] xl:w-[70rem] xl:m-auto mt-6 xl:mt-6'>
                <SearchBar />   
                <div className='flex flex-row gap-2'>
                    <Dropdown defaultPlacement={"bottom-start"} trigger={<button className='navlink'><ChartBarIcon className='w-5 h-5' />Sort</button>}>
                        <DropdownLink text='Relevance' link={"/"} icon={<MagnifyingGlassIcon />} />
                        <DropdownLink text='Hot' link={"/"} icon={<BoltIcon />} />
                        <DropdownLink text='Rising' link={"/"} icon={<ArrowTrendingUpIcon />} />
                    </Dropdown>
                    <Link className={"navlink-full"} href={"/create"}><PlusIcon className={"w-5 h-5"} />Create</Link>                    
                </div>             
            </div>

            <div className='mb-6 mt-6' />

            <div className='flex flex-col gap-4'>
                {query ?
                
                    <>
                        <SearchResults query={query} currentPage={currentPage} type={"post"} />                     
                    </>

                :
                    <h1 className="subtitle w-fit m-auto mb-6">Either you&apos;ve reached the end, or you haven&apos;t searched yet.</h1>
                }
            </div>

        </div>

        

    )

}