import user from "../images/user.png";
export const User = () => {
    return (
        <div className="user-icon-box">
            <div className="user-icon-name">user name</div>
            <img src={user} alt="" className="user-icon" />
        </div>
    );
};
