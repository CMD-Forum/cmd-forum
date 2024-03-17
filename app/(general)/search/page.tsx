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

            <div className="flex flex-col border-b-1 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">

                <h1 className="header">Search</h1>
                <p className="text-gray-300 font-medium antialiased w-full">Find that post you liked</p>   

            </div>

            <div className='px-6 flex flex-col md:flex-row gap-2 max-w-[70rem] xl:w-[70rem] xl:m-auto mt-6 xl:mt-6'>
                <SearchBar />   
                <div className='flex flex-row gap-2'>
                    <Dropdown headerText={"Sort"} align={"left"} headerClassName={"!border-1 !border-border"} accountHeading={false} headerIcon={<ChartBarIcon />}>
                        <DropdownLink text='Relevance' link={"/"} icon={<MagnifyingGlassIcon />} />
                        <DropdownLink text='Hot' link={"/"} icon={<BoltIcon />} />
                        <DropdownLink text='Rising' link={"/"} icon={<ArrowTrendingUpIcon />} />
                    </Dropdown>
                    <Link className={"navlink-full"} href={"/create"}><PlusIcon className={"w-5 h-5"} />Create</Link>                    
                </div>             
            </div>

            <hr className='border-border facebookTheme:border-[#b3b3b3] mb-6 mt-6' />

            <div className='flex flex-col gap-4'>
                {query ?
                
                    <>
                        <SearchResults query={query} currentPage={currentPage} type={"post"} />                     
                    </>

                :
                    <h1 className="text-gray-300 font-medium antialiased w-fit m-auto mb-6">Search for results to show</h1>
                }
            </div>

        </div>

        

    )

}