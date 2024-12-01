import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Carosel() {
  const { allItems } = useContext(AuthContext);

  return (
    <div className="mt-20">
      <h1 className="text-center text-gray-400 font-secondFont text-5xl">
        Find Things You'll Love
      </h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper "
      >
        {allItems.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="flex flex-col justify-evenly items-center my-20">
              <img className="w-60 h-60" src={item.image} alt="" />
              <h1 className="text-xl mt-5">{item.watch}</h1>
              <Link>
                <h1 className="mt-5">BOOK NOW</h1>{" "}
                <FaArrowRight className="mx-auto mt-5" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
