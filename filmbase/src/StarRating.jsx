import { useState } from "react";
import PropTypes from "prop-types";

export const StarRating = ({
    maxRating = 5,
    color = "#fcc419",
    size = 36,
    defaultRating = 0,
    rating,
    setRating,
    disabled = false,
    onRate,
}) => {
    const [starHover, setStarHover] = useState(defaultRating);
    const contStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: "16px",
    };
    const starContStyle = {
        display: "flex",
    };
    const textStyle = {
        color,
        lineHeight: "0",
        margin: "0",
        fontSize: `${size}px`,
    };
    const handleRating = (rating) => {
        if (!disabled) {
            setRating(rating);
        }
        if (onRate) {
            onRate(rating);
        }
    };
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: "block",
        cursor: disabled ? "default" : "pointer",
    };
    return (
        <div style={contStyle} className="star-box">
            <div style={starContStyle} className="star">
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        onRate={() => handleRating(i + 1)}
                        full={starHover ? starHover >= i + 1 : rating >= i + 1}
                        onHoverIn={() =>
                            disabled ? rating : setStarHover(i + 1)
                        }
                        onHoverOut={() => (disabled ? rating : setStarHover(0))}
                        starStyle={starStyle}
                        color={color}
                    ></Star>
                ))}
            </div>
            <p style={textStyle} className="star-rating">
                {rating || ""}
            </p>
        </div>
    );
};

function Star({ onRate, full, onHoverIn, onHoverOut, starStyle, color }) {
    return (
        <span
            role="button"
            onClick={onRate}
            style={starStyle}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            {full ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={color}
                    stroke="#000"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#000"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="{2}"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                </svg>
            )}
        </span>
    );
}
StarRating.propTypes = {
    maxRating: PropTypes.number,
    defaultRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
};
