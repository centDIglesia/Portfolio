"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MoonIcon } from "@solar-icons/react/bold-duotone/moon"
import { SunIcon } from "@solar-icons/react/bold-duotone/sun"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-xl text-primary hover:text-primary">
        <MoonIcon size={24} className="size-6 text-primary" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-xl text-primary hover:text-primary"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon size={24} className="size-6 text-primary" />
      ) : (
        <MoonIcon size={24} className="size-6 text-primary" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
