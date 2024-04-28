import { Fade } from "react-awesome-reveal";

export const ErrorMessage = ({
    errorTxt,
    boxWidth,
    boxHeight,
    boxBg,
    errFontSize,
    errBackground,
}) => {
    const errorBox = {
        width: boxWidth,
        height: boxHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: boxBg,
    };
    const errorP = {
        fontSize: errFontSize,
        background: errBackground,
    };
    return (
        <Fade className={errorBox}>
            <p className={errorP}>{errorTxt}</p>
        </Fade>
    );
};
