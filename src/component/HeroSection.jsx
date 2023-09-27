export default function HeroSection(){
    return (
        <>
            <section className="mt-24">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-semibold mb-2">Securing Tomorrow Today</h1>
                    <h1 className="text-4xl font-semibold mb-6">AI-Powered Policing</h1>
                    <span className="w-5/12 text-slate-700 text-lg font-medium text-center">Discover the future of policing, where technology enhances security and community well-being.</span>
                    <div className="flex mt-8 justify-around w-[25rem]">
                        <button className="h-10 rounded-md px-2 border-[1px] font-medium hover:bg-slate-200 border-solid border-slate-300">What We Have Done <img src="./assets/right_icon.svg" alt="" className="inline h-4"/></button>
                        <button className="h-10 rounded-md px-2 border-[1px] font-medium hover:bg-slate-200 border-solid border-slate-300">Get Platform Demo  <img src="./assets/right_icon.svg" alt="" className="inline h-4"/></button>
                    </div>
                </div>
                <div className="mt-8 flex mb-16 items-center justify-center">
                    <video src="./assets/hero_video.mp4" width={800} muted controls loop></video>
                </div>
            </section>
        </>
    )
}