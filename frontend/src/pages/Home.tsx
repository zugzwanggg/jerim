import { HomeIcon, Trees } from "lucide-react"

const Home = () => {
  return (
    <div className="relative bg-dark-secondary md:bg-none pt-32 md:pt-20 px-4 md:px-6 min-h-screen z-20">
      <img src="/home.png" alt="home-bg" className="hidden md:block -z-10 absolute top-0 left-0 w-full h-full object-cover" />
      
      <div className="max-w-lg ml-0 md:ml-28 mt-20 md:mt-28">
        <h2 className="text-white text-center md:text-left font-bold text-4xl md:text-5xl mb-4">Help the planet, Navigate with JERIM</h2>
        <p className="text-gray-300 text-2xl text-center md:text-left mb-8">Make the switch to the greenest map navigator on the planet</p>
        <button className="bg-primary-green block mx-auto md:mx-0 text-black font-bold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all">
          Get Started
        </button>

        {/* addidtional info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-dark-color border border-zinc-500 rounded-lg p-4 mt-8">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Trees className="text-primary-green w-8 h-8 md:w-6 md:h-6" />
            <div>
              <h3 className="text-white font-bold text-2xl md:text-xl">230,787,550</h3>
              <p className="text-gray-400 text-sm">Trees planted by JERIM</p>
            </div>
          </div>
          <div className="hidden md:block h-12 w-px bg-zinc-500"></div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <HomeIcon className="text-primary-green w-8 h-8 md:w-6 md:h-6" />
            <div>
              <h3 className="text-white font-bold text-2xl md:text-xl">$93,282,613</h3>
              <p className="text-gray-400 text-sm">Dedicated to climate action</p>
            </div>
          </div>
        </div>
      </div>

      <img 
        src="/screen.webp" 
        alt="screen" 
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 max-w-2xl object-contain"
      />
    </div>
  )
}

export default Home