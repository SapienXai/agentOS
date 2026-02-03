"use client"

import * as React from "react"
import { Moon, Sun, Waves, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative rounded-full w-9 h-9">
        <Sun className="h-[1.2rem] w-[1.2rem] opacity-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('blue')
    else if (theme === 'blue') setTheme('space')
    else setTheme('light')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="relative rounded-full w-9 h-9 overflow-hidden"
    >
      <Sun 
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`} 
      />
      <Moon 
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`} 
      />
      <Waves 
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          theme === 'blue' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`} 
      />
      <Sparkles 
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          theme === 'space' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
