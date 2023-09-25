export default function Navbar(){
    return (
        <>
            <div>
                <nav className="flex justify-between">
                    <div>
                        <img src="./assets/logo.svg" alt="" className="h-16"/>
                    </div>
                    <div>
                        <ul className="flex justify-between">
                            <li>How it works</li>
                            <li>Integration</li>
                            <li>Who we are</li>
                        </ul>
                    </div>
                    <div className="flex ">
                        <div>
                            <button>Login</button>
                        </div>
                        <div>
                            <button>Product Demo</button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}