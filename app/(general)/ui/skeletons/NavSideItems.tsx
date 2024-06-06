export default function NavSideItemsFallback() {

    return (

        <div className="flex-col sticky top-[115px] gap-2 px-2 !first:pt-0 !last:pb-0">

            <div className="navlink-sidebar animate-pulse"></div>
            <div className="navlink-sidebar animate-pulse"></div>
            <div className="navlink-sidebar animate-pulse"></div>
            <hr className='border-zinc-900 mt-1 mb-1 facebookTheme:border-[#b3b3b3] facebookTheme:hidden'></hr>
            <div className="navlink-sidebar animate-pulse"></div>
            <div className="navlink-sidebar animate-pulse"></div>

        </div>

    );

}