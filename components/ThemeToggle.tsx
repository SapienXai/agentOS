"use client"

import * as React from "react"
import { Moon, Sun, Waves, Sparkles, Contrast, Circle, Zap } from "lucide-react"
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
    else if (theme === 'space') setTheme('bw')
    else if (theme === 'bw') setTheme('wb')
    else if (theme === 'wb') setTheme('purple')
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
      <Contrast 
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          theme === 'bw' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`} 
      />
      <Circle 
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 fill-foreground ${
          theme === 'wb' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`} 
      />
      <Zap 
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          theme === 'purple' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
