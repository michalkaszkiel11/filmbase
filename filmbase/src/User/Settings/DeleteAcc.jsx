export const DeleteAcc = ({ click }) => {
    return (
        <form className="settings-box">
            <h3 onClick={click}>Delete account</h3>
            <input type="password" placeholder="enter password" />
            <button type="submit" className="btn1">
                Confirm
            </button>
        </form>
    );
};
