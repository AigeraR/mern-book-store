import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = [
  {
    url: 'https://ndc.book24.ru/resize/2200x640/iblock/348/3482514ce8f3ccf1980d641860a112b4/7a81cb12bf671b0411e48d0f35469cee.jpg',
    alt: 'Banner 1'
  },
  {
    url: 'https://ndc.book24.ru/resize/2200x640/iblock/eee/eeed1d4fbfef69b0fb522baf73594cd2/2fcf523c235d830d20b69fc4b065f90f.jpg',
    alt: 'Banner 2'
  },
  {
    url: 'https://ndc.book24.ru/resize/2200x640/iblock/eea/eea0a7d396075a1cb971d7fc60995341/f3c0d45e627fbc737c04e371d700c011.jpg',
    alt: 'Banner 3'
  },
  {
    url: 'https://ndc.book24.ru/resize/2200x640/iblock/fd9/fd9f5c5b76cd8adec0fda430137b6a77/abd11b7d37cac8afa45b21efc689b4a2.jpg',
    alt: 'Banner 4'
  },
  {
    url: 'https://ndc.book24.ru/resize/2200x640/iblock/de2/de2bd347da4c912efced7e9478bc13ea/58e33a49a09a1fdaec7d1a4f8aa3727d.jpg',
    alt: 'Banner 5'
  }
];

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 cursor-pointer rounded-full z-10"
      onClick={onClick}
    >
      &gt;
    </div>
  );
}

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-600  text-white p-2 cursor-pointer rounded-full z-10"
      onClick={onClick}
    >
      &lt;
    </div>
  );
}

const BannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 4 секунды
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

    return (
    <div className=" relative container mx-auto mt-3  w-full">
      <Slider {...settings}>
        {bannerImages.map((image, index) => (
          <div key={index} className="flex items-center justify-center h-[300px] bg-gray-200">
            <img src={image.url} alt={image.alt} className="object-cover w-full h-full" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BannerCarousel;
