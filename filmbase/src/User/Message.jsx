export const Message = ({ message, eventType, color, icon }) => {
    const boxStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
    };
    const messageStyle = {
        color: color,
    };
    return (
        <div style={boxStyle}>
            <h2 style={messageStyle}>{eventType}</h2>
            <p>
                {message} {icon && <i className={icon}></i>}
            </p>
        </div>
    );
};
