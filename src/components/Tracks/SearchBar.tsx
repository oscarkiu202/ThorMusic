import { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (q: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'Buscar canciones, artistas, géneros...' }: SearchBarProps) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value)
    }, 400)
    return () => clearTimeout(timer)
  }, [value, onSearch])

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-thor-muted">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-thor-card border border-thor-border rounded-2xl pl-11 pr-5 py-4 text-thor-text font-body text-base placeholder-thor-subtle focus:outline-none focus:border-thor-accent focus:ring-1 focus:ring-thor-accent transition-all"
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-thor-muted hover:text-thor-text text-sm"
        >
          ✕
        </button>
      )}
    </div>
  )
}
