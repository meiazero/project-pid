import { Link } from "react-router-dom"

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-sm">
      <h1 className="text-3xl font-semibold">
        <Link to="/">Todo App</Link>
      </h1>
    </header>
  )
}
