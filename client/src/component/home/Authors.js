import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../output.css';
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";


const NextArrow = ({ onClick }) => {
    return (
      <MdOutlineNavigateNext
        className="absolute top-1/3 right-4 sm:w-6 sm:h-6 md:w-6 md:h-6 xl:w-10 xl:h-10 border-4 bg-white shadow-md shadow-white  transform -translate-y-1/2 cursor-pointer rounded-full z-10"
        onClick={onClick}
      />
    );
  }
  
  const PrevArrow = ({ onClick }) => {
    return (
        <GrFormPrevious  onClick={onClick} className='absolute top-1/3 left-4  sm:w-6 sm:h-6 md:w-6 md:h-6 xl:w-10 xl:h-10 border-4 bg-white shadow-md shadow-white transform -translate-y-1/2  cursor-pointer rounded-full z-10'/>
    );
  }
function AuthorCarousel({ authors }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
   
    return (
        <Slider {...settings} className='relative px-4'>
            {authors.map((author) => (
                <div key={author._id} className='transition-transform duration-200 transform hover:scale-105'>
                    <Link to={`/author/${author._id}`}>
                        <img 
                            src={author.img} 
                            alt={author.name} 
                            className="object-cover rounded-full mx-auto border-2 border-gray-200 author-image" 
                            onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150"; }} // Placeholder image in case of error
                        />
                    </Link>
                    <p className="text-center font-bold text-gray-500  sm:text-sm md:text-md  mt-2 text-sm">{author.name}</p>
                </div>
            ))}
        </Slider>
    );
}

function Authors() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/author/getAuthors');
                //unique authors
                const uniqueAuthors = Array.from(new Set(response.data.map(a => a.name)))
                .map(name => {
                    return response.data.find(a => a.name === name);
                });
            setAuthors(uniqueAuthors);
            setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchAuthors();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-sm font-bold p-9 sm:text-sm md:text-md xl:text-xl lg:text-lg">Популярные авторы</h1>
            <AuthorCarousel authors={authors} />
        </div>
    );
}

export default Authors;
