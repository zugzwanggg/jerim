// import { useTranslation } from "react-i18next"

const Footer = () => {
//   const { t } = useTranslation()

  return (
    <footer className="bg-dark-secondary">
      <center>
          <hr className="my-3 bg-zinc-500 sm:mx-auto lg:my-6 text-center" />
          <span className="block text-sm pb-4 text-zinc-300 dark:text-white/50 text-center">
          © 2025{" "}
          <a href="#" className="hover:underline">
            JERIM
          </a>
          . All rights reserved.
          </span>
      </center>
    </footer>
  )
}

export default Footer