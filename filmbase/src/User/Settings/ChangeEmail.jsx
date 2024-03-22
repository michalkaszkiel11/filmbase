export const ChangeEmail = ({ click }) => {
    return (
        <form className="settings-box">
            <h3 onClick={click}>Change e-mail</h3>
            <input type="email" placeholder="new e-mail" />
            <button type="submit" className="btn1">
                Confirm
            </button>
        </form>
    );
};
