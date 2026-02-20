import { Link } from "react-router-dom"

interface Props {
  title: string
  author: string
  image: string
  price: string
  rating?: number
  id?: string
}

export function BookCard({
  title,
  author,
  image,
  price,
  rating = 5,
  id = "1",
}: Props) {
  return (
    <Link to={`/livro/${id}`}>
      <div className="w-52 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer">
        <img
          src={image}
          alt={title}
          className="h-72 w-full object-cover"
        />

        <div className="p-4 text-center">
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs text-blue-gray">{author}</p>

          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < rating ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>

          <p className="font-bold mt-2">{price}</p>
        </div>
      </div>
    </Link>
  )
}