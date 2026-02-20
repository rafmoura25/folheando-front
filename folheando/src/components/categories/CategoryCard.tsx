interface Props {
  name: string
  image: string
}

export function CategoryCard({ name, image }: Props) {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer">

      <img
        src={image}
        alt={name}
        className="absolute w-full h-full object-cover brightness-50 group-hover:brightness-75 transition duration-300"
      />

      <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
        {name}
      </div>
    </div>
  )
}