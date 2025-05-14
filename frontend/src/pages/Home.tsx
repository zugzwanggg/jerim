import { HomeIcon, Trees, Cloud, Wind, Thermometer, Droplets } from "lucide-react"
import { atyrauLocationData } from "@/constants/mockData";
import axios from "axios";
import { useEffect, useState } from "react";
import type { IPollutionData, IWeatherData } from "@/types";

const Home = () => { 
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState<IWeatherData|null>(null)
  const [pollution, setPollution] = useState<IPollutionData|null>(null);

  const getWeather = async () => {
    try {

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/city`);
      console.log(res.data.data);
      setPollution(res.data.data.current.pollution);
      setWeather(res.data.data.current.weather);
      setCity(res.data.data.city);
      setState(res.data.data.state);
      setCountry(res.data.data.country);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getWeather();
  }, [])

  return (
    <>
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
          className="hidden lg:block absolute -right-0 top-1/2 -translate-y-1/2 w-1/2 max-w-2xl object-contain"
        />
      </div>

      <div className="px-2 md:px-6 py-8 md:py-12 bg-gradient-to-br from-dark-secondary to-dark-color">
        <div className="max-w-7xl mx-auto">
          <div className="bg-dark-color/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <Cloud className="w-6 h-6 md:w-8 md:h-8 text-primary-green" />
                  {city}
                </h2>
                <p className="text-gray-400 text-sm md:text-base">{state}, {country}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-gray-400 text-sm">Last updated</p>
                <p className="text-white text-sm md:text-base truncate max-w-[200px] md:max-w-none">
                  {new Date(new Date().getTime() - (85 * 60 * 1000)).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
              <div className="bg-gradient-to-br from-dark-secondary to-dark-color rounded-xl p-3 md:p-6 border border-white/5 hover:border-primary-green/50 transition-colors">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="bg-primary-green/10 p-1.5 md:p-2 rounded-lg">
                    <Thermometer className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
                  </div>
                  <span className="text-gray-400 text-sm md:text-base truncate">Temperature</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">{weather?.tp}°C</p>
              </div>
              
              <div className="bg-gradient-to-br from-dark-secondary to-dark-color rounded-xl p-3 md:p-6 border border-white/5 hover:border-primary-green/50 transition-colors">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="bg-primary-green/10 p-1.5 md:p-2 rounded-lg">
                    <Droplets className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
                  </div>
                  <span className="text-gray-400 text-sm md:text-base truncate">Humidity</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">{weather?.hu}%</p>
              </div>
              
              <div className="bg-gradient-to-br from-dark-secondary to-dark-color rounded-xl p-3 md:p-6 border border-white/5 hover:border-primary-green/50 transition-colors">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="bg-primary-green/10 p-1.5 md:p-2 rounded-lg">
                    <Wind className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
                  </div>
                  <span className="text-gray-400 text-sm md:text-base truncate">Wind Speed</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">{weather?.ws} m/s</p>
              </div>
              
              <div className="bg-gradient-to-br from-dark-secondary to-dark-color rounded-xl p-3 md:p-6 border border-white/5 hover:border-primary-green/50 transition-colors">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="bg-primary-green/10 p-1.5 md:p-2 rounded-lg">
                    <Cloud className="w-5 h-5 md:w-6 md:h-6 text-primary-green" />
                  </div>
                  <span className="text-gray-400 text-sm md:text-base truncate">Air Quality</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">AQI {pollution?.aqius}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <div className="bg-gradient-to-br from-dark-secondary to-dark-color rounded-xl p-4 md:p-6 border border-white/5">
                <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Weather Details</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm md:text-base">Pressure</span>
                    <span className="text-white font-medium text-sm md:text-base">{weather?.pr} hPa</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm md:text-base">Wind Direction</span>
                    <span className="text-white font-medium text-sm md:text-base">{weather?.wd}°</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-dark-secondary to-dark-color rounded-xl p-4 md:p-6 border border-white/5">
                <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Air Quality Details</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm md:text-base">Main Pollutant</span>
                    <span className="text-white font-medium text-sm md:text-base">{pollution?.mainus}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm md:text-base">{city} AQI</span>
                    <span className="text-white font-medium text-sm md:text-base">{pollution?.aqicn}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home