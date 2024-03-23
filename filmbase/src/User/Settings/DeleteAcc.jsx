export const DeleteAcc = ({
    clickDelete,
    handleDeleteAccount,
    setCurrentPass,
    deletion,
    message,
}) => {
    return (
        <form className="settings-box" onSubmit={handleDeleteAccount}>
            <h3 onClick={clickDelete}>Delete account</h3>
            <input
                type="password"
                placeholder="enter password"
                onClick={(e) => setCurrentPass(e.target.value)}
            />

            <button type="submit" className="btn1">
                Confirm
            </button>
            {deletion ? (
                <p style={{ color: "green" }}>Success</p>
            ) : (
                <p style={{ color: "red" }}>{message}</p>
            )}
        </form>
    );
};
