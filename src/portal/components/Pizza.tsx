const imgleft = "/assets/pizzaBackground.png";
const imgRight = "/assets/pizzaBackground2.png";
const selvioImg = "/assets/selvio.png";

export default function Pizza() {
  return (
    <>
    <section className="w-full lg:hidden bg-gradient-to-t from-black via-[#303030] to-black">
      <div className="relative flex h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="w-[28%] flex-shrink-0 hidden lg:flex">
          <img src={imgleft} className="w-full h-full object-cover block" alt="" />
        </div>

        {/* CENTER CONTENT */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 ">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full max-w-2xl items-center gap-2 md:gap-4">

            {/* TEXT + BUTTON */}
            <div className="text-center">
              <h2 className="text-white uppercase font-bold tracking-[0.1em] text-base sm:text-lg md:text-xl leading-tight">
                THE BEST PIZZA IN CARTAGENA
              </h2>
              <p className="mt-1 text-[10px] sm:text-xs text-white tracking-wide opacity-90">
                A PLACE THAT DELIGHTS THE SOUL AND PALATE.
              </p>
              <button className="mt-1 py-2 px-6  w-full rounded text-white text-xs sm:text-sm font-bold tracking-wide bg-gradient-to-b from-gold to-gold-light hover:opacity-90 transition">
                BOOK NOW
              </button>
            </div>

            {/* SELVIO IMAGE */}
            <div className="hidden lg:flex items-end justify-center h-full">
              <img
                src={selvioImg}
                className="h-[160px] lg:h-[180px] w-auto object-contain"
                alt="Selvio"
              />
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-[28%] flex-shrink-0 hidden lg:flex">
          <img src={imgRight} className="w-full h-full object-cover block" alt="" />
        </div>

        {/* MOBILE: background image overlay */}
        <div className="absolute inset-0 lg:hidden opacity-20 pointer-events-none">
          <img src={imgleft} className="w-1/2 h-full object-cover float-left" alt="" />
          <img src={imgRight} className="w-1/2 h-full object-cover float-right" alt="" />
        </div>

      </div>
    </section>



    <section className="w-full hidden lg:block bg-gradient-to-t from-black via-[#303030] to-black">
      <div className="relative flex h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden">
        {/* LEFT IMAGE */}
        <div
          className="w-[28%] bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: "url('/images/pizza-left.jpg')",
          }}
        >
          <img src={imgleft} className="w-full h-full" />
        </div>

        {/* CENTER CONTENT */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[70%_30%] text-center lg:text-start items-center">
          {/* LEFT CONTENT */}
          <div className="w-full text-center md:text-start container md:px-0 ">
            <h2
              className="
                text-white
                uppercase
                font-bold
                tracking-[0.12em]
                text-xl
                md:text-sm
                md:text-xl
              "
            >
              THE BEST PIZZA IN CARTAGENA
            </h2>

            <p
              className="
                mt-1
                text-[10px]
                md:text-[10px]
                text-white
                tracking-wide
              "
            >
              A PLACE THAT DELIGHTS THE SOUL AND PALATE.
            </p>

            <button
             onClick={() => window.location.href = "https://www.google.com/maps/place/Di+Silvio+Trattoria/@10.4208361,-75.5458914,15z/data=!4m2!3m1!1s0x0:0x59d79dd568dd85a9?sa=X&ved=1t:2428&ictx=111"}
              className="
                mt-4
                py-2.5
                w-full
                rounded
                text-white
                text-[12px]
                font-bold
                tracking-wide
                bg-gradient-to-b
                from-gold
                to-gold-light
                hover:opacity-90
                transition

              "
            >
              {/* <a href="https://www.google.com/maps/place/Di+Silvio+Trattoria/@10.4208361,-75.5458914,15z/data=!4m2!3m1!1s0x0:0x59d79dd568dd85a9?sa=X&ved=1t:2428&ictx=111"></a> */}
              BOOK NOW
            </button>
          </div>

          {/*  Selvio Img */}
          <div className="hidden md:block py-14 w-full h-full">
            <div>
              <img
                src={selvioImg}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-[28%] bg-cover bg-center hidden md:block">
          <img src={imgRight} className="w-full h-full" />
        </div>
      </div>
    </section>
        </>
  );
}

// import imgleft from "../assets/pizzaBackground.png";
// import imgRight from "../assets/pizzaBackground2.png";
// import selvioImg from "../assets/selvio.png";

// export default function Pizza() {
//   return (
//     <section className="w-full bg-gradient-to-t from-black via-[#303030] to-black">
//       <div className="relative flex h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden">

//         {/* LEFT IMAGE */}
//         <div className="w-[28%] flex-shrink-0 hidden sm:flex">
//           <img src={imgleft} className="w-full h-full object-cover block" alt="" />
//         </div>

//         {/* CENTER CONTENT */}
//         <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 ">
//           <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] w-full max-w-2xl items-center gap-2 md:gap-4">

//             {/* TEXT + BUTTON */}
//             <div className="text-center md:text-start">
//               <h2 className="text-white uppercase font-bold tracking-[0.1em] text-base sm:text-lg md:text-xl leading-tight">
//                 THE BEST PIZZA IN CARTAGENA
//               </h2>
//               <p className="mt-1 text-[10px] sm:text-xs text-white tracking-wide opacity-90">
//                 A PLACE THAT DELIGHTS THE SOUL AND PALATE.
//               </p>
//               <button className="mt-1 py-2 px-6 sm:w-auto w-full rounded text-white text-xs sm:text-sm font-bold tracking-wide bg-gradient-to-b from-gold to-gold-light hover:opacity-90 transition">
//                 BOOK NOW
//               </button>
//             </div>

//             {/* SELVIO IMAGE */}
//             <div className="hidden md:flex items-end justify-center h-full">
//               <img
//                 src={selvioImg}
//                 className="h-[160px] lg:h-[180px] w-auto object-contain"
//                 alt="Selvio"
//               />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="w-[28%] flex-shrink-0 hidden sm:flex">
//           <img src={imgRight} className="w-full h-full object-cover block" alt="" />
//         </div>

//         {/* MOBILE: background image overlay */}
//         <div className="absolute inset-0 sm:hidden opacity-20 pointer-events-none">
//           <img src={imgleft} className="w-1/2 h-full object-cover float-left" alt="" />
//           <img src={imgRight} className="w-1/2 h-full object-cover float-right" alt="" />
//         </div>

//       </div>
//     </section>
//   );
// }
