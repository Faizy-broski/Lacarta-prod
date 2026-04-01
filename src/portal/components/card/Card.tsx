import { Eye } from "lucide-react";

const Card = ({ image, category, title, author, time, className = "" }) => (
  // <div className={`relative overflow-hidden shadow-lg group  ${className}`}>
  <div className={`relative overflow-hidden shadow-lg group  ${className}`}>
    <img
      src={image}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 "
      alt=""
    />

    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /> */}

    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
      <span
        className="inline-block relative left-2 sm:left-3 top-2 sm:top-3 
                   bg-white text-black 
                   text-[8px] sm:text-sm 
                   font-medium sm:font-extrabold 
                   px-2 py-1 mb-2"
      >
        <span>{category}</span>
        <span className="sm:hidden ml-1 opacity-80">{time}</span>
      </span>

      <div
        className="
      bg-gradient-to-b from-gold to-gold-light 
      text-black 
      font-semibold  sm:font-bold
      text-[8px] sm:text-lg md:text-xl 
      leading-tight 
      py-1.5 sm:py-2 
      px-2 sm:px-3
    "
      >
        {title}
      </div>

      <div
        className="
      bg-gradient-to-b from-red to-red-light 
      text-white 
      relative 
      left-2 sm:left-5 md:left-20
      bottom-1 sm:bottom-2
      w-[85%] sm:w-64
      text-[8px] sm:text-xs
      flex items-center 
      px-2 sm:px-3 
      py-1
    "
      >
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 sm:h-7 sm:w-7">
            <img
              src={image}
              className="w-full h-full rounded-full object-cover"
              alt=""
            />
          </div>
          <span>{author}</span>
        </div>

        <div
          className="hidden sm:flex items-center gap-1  
                    relative 
                    -right-4 sm:-right-20 "
        >
          <Eye size={16} className="text-white sm:w-5 sm:h-5" />
          <span className="ml-1 opacity-80">{time}</span>
        </div>
      </div>
    </div>
    {/* <div className="absolute bottom-0 left-0 right-0 p-5">
      <span className="inline-block relative left-3 top-3 bg-white text-black text-sm font-extrabold px-2 py-1 mb-2">
        {category}
      </span>

      <div className="bg-gradient-to-b from-gold to-gold-light text-black font-bold text-2xl leading-tight py-2 px-3">
        {title}
      </div>

      <div className="bg-gradient-to-b from-red  to-red-light text-white relative   sm:left-20 left-5  bottom-2 w-64  text-xs flex items-center px-3 py-1">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7">
            <img
              src={image}
              className="inset-0 w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt=""
            />
          </div>
          <div>
            <span>{author}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 relative sm:-right-20 -right-10">
          <div>
            <Eye size={20} className="text-white" />
          </div>
          <div>
            <span className="relative left-2 opacity-80">{time}</span>
          </div>
        </div>
      </div>
    </div> */}
  </div>
);
export default Card;
