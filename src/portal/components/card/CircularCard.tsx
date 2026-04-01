import { Eye } from "lucide-react";

const CircleCard = ({
  image,
  category,
  title,
  author,
  time,
  className = "",
}) => (
  <div
    className={`relative w-full h-1/1 sm:rounded-full mb-5 overflow-hidden  group aspect-square ${className}`}
  >
    <img
      src={image}
      className="absolute inset-0 w-full h-full rounded-full object-cover transition-transform duration-500 "
      alt=""
    />

    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /> */}

    {/* <div className="absolute bottom-10 left-3 right-3 p-5"> */}
    <div className="absolute bottom-0 left-0 right-0 sm:top-1/3 p-3 sm:p-5">
      <span className="inline-block relative left-2 sm:left-3 top-2 sm:top-3  bg-white text-black text-[8px] sm:text-sm font-medium sm:font-extrabold px-2 py-1 mb-2">
        <span></span>
        {category}

        <span className="sm:hidden ml-1 opacity-80">{time}</span>
      </span>

      <div
        className="bg-gradient-to-b from-gold to-gold-light text-black font-semibold  sm:font-bold
      text-[8px] sm:text-lg md:text-xl  w-[90%]  leading-tight py-1.5 sm:py-2 
      px-2 sm:px-3"
      >
        {title}
      </div>

      <div
        className="bg-gradient-to-b from-red  to-red-light text-white relative left-2 sm:left-5 md:left-20  bottom-1 sm:bottom-2 w-[85%] sm:w-64
      text-[8px] sm:text-xs flex items-center px-3 py-1"
      >
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 sm:w-7 sm:h-7">
            <img
              src={image}
              className="inset-0 w-full h-full rounded-full object-cover transition-transform duration-500 "
              alt=""
            />
          </div>
          <div>
            <span>{author}</span>
          </div>
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
  </div>
);
export default CircleCard;
