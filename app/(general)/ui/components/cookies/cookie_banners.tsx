export default function CookieBanner() {

        return (
            <div className="fixed bottom-8 left-8 mr-8 p-4 rounded-lg w-fit bg-card border-1 border-border z-[999999] shadow-xl">
                <p className="header !text-lg">Cookies are used by this site</p>
                <p className="text-gray-300 text-sm">Cookies are required to use this site. By continuing to use CMD/&gt;, you agree to these cookies. <br /> (There aren&apos;t actually any cookies, this is just legal stuff)</p>
                <div className="flex flex-row gap-2">
                    <button className="navlink-full mt-4">Okay</button>
                    <button className="navlink mt-4">No Thanks</button>                
                </div>
            </div>
        );

}