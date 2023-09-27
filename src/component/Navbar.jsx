export default function Navbar(){
    return (
        <>
            <div className="px-8">
                <nav className="flex justify-between items-center h-20">
                    <div className="w-52">
                        <img src="./assets/logo.svg" alt="" className="h-20 cursor-pointer"/>
                    </div>
                    <div>
                        <ul className="flex justify-around h-12 text-slate-500 items-center rounded-3xl w-[35rem] border-[1px] border-solid border-slate-500">
                            <li className="hover:text-[#843df5] cursor-pointer">How it works</li>
                            <li className="hover:text-[#843df5] cursor-pointer">Integration</li>
                            <li className="hover:text-[#843df5] cursor-pointer">Who we are</li>
                        </ul>
                    </div>
                    <div className="flex w-52 justify-between items-center">
                        <div>
                            <button className="text-[#843df5] h-10 w-20 rounded-md hover:bg-[#ece8ff]">Login</button>
                        </div>
                        <div>
                            <button className="h-10 rounded-md px-2 bg-[#843df5] text-white">Product Demo</button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}