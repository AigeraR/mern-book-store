import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = [
  {
    url: 'https://www.kitapsepeti.com/Data/BlockUploadData/slider/img1/331/kazandiran-mayis-indirimleri-koc-universitesi-yayinlari-banner-113-tr.jpg?1715759046',
    alt: 'Banner 1'
  },
  {
    url: 'https://www.kitapsepeti.com/Data/BlockUploadData/slider/img1/331/iyzco-cashback-kampanyasi-banner-111-tr.jpg?1714736828',
    alt: 'Banner 2'
  },
  {
    url: 'https://via.placeholder.com/1200x400.png?text=Banner+3',
    alt: 'Banner 3'
  },
  {
    url: 'https://via.placeholder.com/1200x400.png?text=Banner+4',
    alt: 'Banner 4'
  },
  {
    url: 'https://via.placeholder.com/1200x400.png?text=Banner+5',
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
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 cursor-pointer rounded-full z-10"
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
