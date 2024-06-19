import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaBookmark } from 'react-icons/fa';

const NextArrow = ({ onClick }) => (
    <MdOutlineNavigateNext
        onClick={onClick}
        className="absolute top-1/3 right-2 sm:right-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white shadow-md transform -translate-y-1/2 cursor-pointer rounded-full z-10"
    />
);

const PrevArrow = ({ onClick }) => (
    <GrFormPrevious
        onClick={onClick}
        className="absolute top-1/3 left-2 sm:left-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white shadow-md transform -translate-y-1/2 cursor-pointer rounded-full z-10"
    />
);

const Carousel = ({ books }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    if (!books || books.length === 0) {
        return <div>No similar books available.</div>;
    }

    return (
        <Slider {...settings} className="relative px-2 sm:px-4">
            {books.map((book) => (
                <div key={book._id} className="p-4 mb-6 border rounded-md flex flex-col items-center space-y-3">
                    <Link to={`/book/${book._id}`} className="block mb-2 items-center">
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-32 h-48 sm:w-40 sm:h-56 object-cover ml-5 rounded-md shadow-md"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
                        />
                    </Link>
                    <div className="text-center flex flex-col items-center">
                        <h3 className="text-sm font-semibold text-gray-800" style={{ height: '3em' }}>{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">{book.author.name}</p>
                        <p className="text-sm font-bold">{book.price} сом</p>
                        <div className="flex justify-center items-center space-x-3 mt-2">
                            <div className="text-sm border border-gray-400 px-3 py-1 rounded-md hover:bg-green-400 hover:text-white">
                                <Link to={`/cart`}>В корзину</Link>
                            </div>
                            <FaBookmark className='w-5 h-5 hover:text-orange-500' />
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

const SimilarBooks = ({ books }) => (
    <div className="mt-8">
        <h2 className="text-base font-bold mb-4">Похожие книги</h2>
        <Carousel books={books} />
    </div>
);

export default SimilarBooks;
