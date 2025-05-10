import LocationMap from "@/components/LocatonMap"

const Map = () => {
  return (
    <div className=" pt-32 md:pt-20 px-4 md:px-6 min-h-screen z-20">
        <h1 className="text-2xl font-bold">JERIM - Map</h1>
        <div className="mx-auto px-10 mt-10 h-[500px]">
            <LocationMap />
        </div>
    </div>
  )
}

export default Map