import { Search } from "lucide-react"
// import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const SearchBar = () => {
  // const { t } = useTranslation()

  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [query, setQuery] = useState(removeSpace)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(removeSpace)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(removeSpace)
    navigate(`/search?q=${query}`)
    window.location.reload()
  }
  
  return (
    <div className="w-full bg-dark-color rounded-full mt-3">
      <form 
        className="flex items-center justify-between w-full border border-zinc-500 rounded-full"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-1.5 px-4 lg:px-4 w-full outline-none placeholder:text-zinc-300 text-zinc-300"
          placeholder={"Search here..."}
        />

        <button 
          className={`p-2 lg:p-2.5 px-3 lg:px-4 h-full rounded-r-full cursor-pointer`}
          type="submit"
        >
          <div className="w-full h-full">
            <Search size={20} className={`w-full h-full text-primary-green`} />
          </div>
        </button>
      </form>
    </div>
  )
}

export default SearchBar