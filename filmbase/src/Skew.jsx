export const Skew = ({
    width = "50px",
    height = "50px",
    skew = "20",
    background = "#333",
}) => {
    const skewStyle = {
        width: `${width}px`,
        height: `${height}px`,
        transform: `skew(${skew}deg)`,
        backgroundColor: `${background}`,
    };
    return <div style={skewStyle}></div>;
};
