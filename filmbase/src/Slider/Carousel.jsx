import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Movie } from "../Main/MovieList/Movie";
export const Carousel = ({
    movies,
    setSelectedId,
    loading,
    handleFocusOnMovie,
}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        lazyLoad: true,
        // adaptiveHeight: true,
        adaptiveWidth: true,
        // fade: true,
        // centerMode: true,
        // centerPadding: "60px",

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <Slider {...settings} className="slider">
                {movies?.map((movie) => (
                    <>
                        {loading ? (
                            <div className="loading-spinner"></div>
                        ) : (
                            <Movie
                                movie={movie}
                                key={movie.imbID}
                                setSelectedId={setSelectedId}
                                handleFocusOnMovie={handleFocusOnMovie}
                            />
                        )}
                    </>
                ))}
            </Slider>
        </>
    );
};
