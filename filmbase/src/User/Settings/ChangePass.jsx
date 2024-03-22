export const ChangePass = ({
    click,
    setOld,
    setNew,
    changePass,
    passMessage,
    passChanged,
}) => {
    return (
        <form className="settings-box" onSubmit={changePass}>
            <h3 onClick={click}>Change password</h3>
            <input
                type="password"
                placeholder="old password"
                onChange={(e) => {
                    setOld(e.target.value);
                }}
            />
            <input
                type="password"
                placeholder="new password"
                onChange={(e) => {
                    setNew(e.target.value);
                }}
            />
            <button type="submit" className="btn1">
                Confirm
            </button>
            {passChanged ? (
                <p style={{ color: "green" }}>Success</p>
            ) : (
                <p style={{ color: "red" }}>{passMessage}</p>
            )}
        </form>
    );
};
