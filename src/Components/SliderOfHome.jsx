import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function SliderOfHome() {
  const { photos } = useContext(AuthContext);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {photos.map((photo) => (
          <SwiperSlide>
            <div className="flex justify-evenly items-center mt-16">
              <div>
                <h1 className="text-5xl font-extrabold mb-2">
                  {photo.watcName}
                </h1>
                <h1 className="text-5xl font-extrabold mb-2">
                  {photo.discount} %
                </h1>
              </div>
              <img className="w-96" src={photo.slider} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
