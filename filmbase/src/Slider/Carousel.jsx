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
        adaptiveWidth: true,
        // fade: true,
        // centerMode: true,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
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
