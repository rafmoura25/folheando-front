export function AuthorCard() {
  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden w-80">

      <div className="bg-navy w-32 flex items-center justify-center text-white text-4xl">
        👤
      </div>

      <div className="p-4">
        <h3 className="font-semibold">Rafael Moura</h3>
        <p className="text-sm text-blue-gray">58 livros</p>
        <p className="text-xs mt-2 text-blue-gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  )
}