import userpng from "../images/user.png";
import { User } from "../User/User";
export const UserBox = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <div className="user-box">
            <div className="user-icons">
                <div className="user-icon-name">mkaszkiel</div>
                <img src={userpng} alt="" className="user-icon" />
            </div>
            <User />
        </div>
    );
};
