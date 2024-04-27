import { useState } from "react";
import { ChangePass } from "./ChangePass";
import { ChangeEmail } from "./ChangeEmail";
import { DeleteAcc } from "./DeleteAcc";
import { Fade } from "react-awesome-reveal";

export const Settings = ({ loggedInUser, logout }) => {
    const [changePassword, setChangePassword] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [deleteAcc, setDeleteAcc] = useState(false);
    const [oldPassword, setOldpassword] = useState("");
    const [newPassword, setNewpassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [message, setMessage] = useState("");
    const [passChanged, setPassChanged] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    const [deletion, setDeleteion] = useState(false);
    const [currentPass, setCurrentPass] = useState("");
    const { email } = loggedInUser;

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const userInfo = {
            email: email,
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
                setMessage("Success");
                setPassChanged(true);
                logout();
                window.location.reload();
            }
        } catch (err) {
            setPassChanged(false);
            console.error("Error while changing password:", err.message);
            if (err.message === "Passwords do not match") {
                setMessage("Passwords do not match");
            } else if (
                err.message === "New password is the same as old password"
            ) {
                setMessage("New password is the same as old password");
            } else {
                setMessage("An error occurred. Please try again later.");
            }
        } finally {
            setOldpassword("");
            setMessage("");
        }
    };
    const handleChangeEmail = async (e) => {
        e.preventDefault();
        const userInfo = {
            email: email,
            newEmail: newEmail,
        };
        try {
            const response = await fetch(
                "http://localhost:10000/api/users/change-email",
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
                setMessage("Success");
                setEmailChanged(true);
                logout();
                window.location.reload();
            }
        } catch (err) {
            setEmailChanged(false);
            setMessage(err.message);
            console.error("Error while changing email:", err.message);
        } finally {
            setMessage("");
        }
    };
    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        const userInfo = {
            email: email,
            password: currentPass,
        };
        try {
            console.log(userInfo);
            console.log(currentPass);
            const response = await fetch(
                "http://localhost:10000/api/users/delete-account",
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
                setMessage("Success");
                setDeleteion(true);
                window.location.reload();
            }
            logout();
            window.location.reload();
        } catch (err) {
            setMessage(err.message);
            setDeleteion(false);
            console.error("Error while deleting account:", err.message);
        } finally {
            setMessage("");
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
        <Fade className="settings">
            <>
                <div>
                    {changePassword ? (
                        <ChangePass
                            clickPass={clickPassword}
                            setOld={setOldpassword}
                            setNew={setNewpassword}
                            changePass={handleChangePassword}
                            passChanged={passChanged}
                            message={message}
                        />
                    ) : (
                        <p onClick={clickPassword}>Change password</p>
                    )}
                </div>
                <div>
                    {changeEmail ? (
                        <ChangeEmail
                            clickEmail={clickEmail}
                            setNewEmail={setNewEmail}
                            handleChangeEmail={handleChangeEmail}
                            emailChanged={emailChanged}
                            message={message}
                        />
                    ) : (
                        <p onClick={clickEmail}>Change e-mail</p>
                    )}
                </div>
                <div>
                    {deleteAcc ? (
                        <DeleteAcc
                            clickDelete={clickDelete}
                            handleDeleteAccount={handleDeleteAccount}
                            message={message}
                            deletion={deletion}
                            setCurrentPass={setCurrentPass}
                        />
                    ) : (
                        <p onClick={clickDelete}>Delete account</p>
                    )}
                </div>
            </>
        </Fade>
    );
};
