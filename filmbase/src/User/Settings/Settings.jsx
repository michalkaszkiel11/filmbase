import { useState } from "react";
import { ChangePass } from "./ChangePass";
import { ChangeEmail } from "./ChangeEmail";
import { DeleteAcc } from "./DeleteAcc";

export const Settings = ({ loggedInUser }) => {
    const [changePassword, setChangePassword] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [deleteAcc, setDeleteAcc] = useState(false);
    const [oldPassword, setOldpassword] = useState("");
    const [newPassword, setNewpassword] = useState("");
    const [passMessage, setPassMessage] = useState("");
    const [passChanged, setPassChanged] = useState(false);

    const { userId } = loggedInUser;
    const handleChangePassword = async (e) => {
        e.preventDefault();
        const userInfo = {
            userId: userId,
            oldPass: oldPassword,
            newPass: newPassword,
        };
        try {
            const response = await fetch(
                "http://localhost:10000/api/users/change-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userInfo),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            } else {
                setPassMessage("Success");
                setPassChanged(true);
            }
        } catch (err) {
            setPassChanged(false);
            console.error("Error while changing password:", err.message);
            if (err.message === "Passwords do not match") {
                setPassMessage("Passwords do not match");
            } else if (
                err.message === "New password is the same as old password"
            ) {
                setPassMessage("New password is the same as old password");
            } else {
                setPassMessage("An error occurred. Please try again later.");
            }
        }
    };

    const clickPassword = () => {
        setChangeEmail(false);
        setDeleteAcc(false);
        setChangePassword(!changePassword);
    };
    const clickEmail = () => {
        setChangePassword(false);
        setDeleteAcc(false);
        setChangeEmail(!changeEmail);
    };
    const clickDelete = () => {
        setChangeEmail(false);
        setChangePassword(false);
        setDeleteAcc(!deleteAcc);
    };
    return (
        <div className="settings">
            <div>
                {changePassword ? (
                    <ChangePass
                        click={clickPassword}
                        setOld={setOldpassword}
                        setNew={setNewpassword}
                        changePass={handleChangePassword}
                        passChanged={passChanged}
                        passMessage={passMessage}
                    />
                ) : (
                    <p onClick={clickPassword}>Change password</p>
                )}
            </div>
            <div>
                {changeEmail ? (
                    <ChangeEmail click={clickEmail} />
                ) : (
                    <p onClick={clickEmail}>Change e-mail</p>
                )}
            </div>
            <div>
                {deleteAcc ? (
                    <DeleteAcc click={clickDelete} />
                ) : (
                    <p onClick={clickDelete}>Change e-mail</p>
                )}
            </div>
        </div>
    );
};
