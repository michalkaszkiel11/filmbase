export const ChangeEmail = ({
    clickemail,
    setNewEmail,
    handleChangeEmail,
    emailChanged,
    message,
}) => {
    return (
        <form className="settings-box" onSubmit={handleChangeEmail}>
            <h3 onClick={clickemail}>Change e-mail</h3>
            <input
                type="email"
                placeholder="new e-mail"
                onChange={(e) => setNewEmail(e.target.value)}
            />
            <button type="submit" className="btn1">
                Confirm
            </button>
            {emailChanged ? (
                <p style={{ color: "green" }}>Success</p>
            ) : (
                <p style={{ color: "red" }}>{message}</p>
            )}
        </form>
    );
};
