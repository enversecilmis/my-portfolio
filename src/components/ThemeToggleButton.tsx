import { useEffect, useState } from "react"






const ThemeToggleButton: React.FC<{  }> = ({  }) => {

    const [activeTheme, setActiveTheme] = useState("")
    const inactiveTheme = activeTheme === "light" ? "dark" : "light"



    useEffect(() => {
        const savedTheme = window.localStorage.getItem("theme")
        if(savedTheme)
            setActiveTheme(savedTheme)
    }, [])

    useEffect(() => {
        if(!activeTheme) return

        document.body.dataset.theme = activeTheme
        window.localStorage.setItem("theme", activeTheme)
    }, [activeTheme])



    const toggleTheme = () => setActiveTheme(inactiveTheme)

    return (
        <button
            aria-label={`Change to ${inactiveTheme} mode`}
            title={`Change to ${inactiveTheme} mode`}
            className="border border-black rounded-lg hover:bg-gray-50 active:bg-gray-400"
            onClick={toggleTheme}
        >
            Toggle Theme
        </button>
    )
}






export default ThemeToggleButton