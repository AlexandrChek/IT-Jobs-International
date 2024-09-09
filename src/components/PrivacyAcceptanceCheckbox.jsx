import { Link } from "react-router-dom";
import MyCheckbox from './MyCheckbox';

const PrivacyAcceptanceCheckbox = () => {
    const privacyLink = (
        <Link to="/privacy">privacy</Link>
    );
    
    return (
        <>
            <MyCheckbox
                name="privacyAcceptance"
                initialState={true}
                required
            />I accept the {privacyLink} terms.
        </>
    );
};

export default PrivacyAcceptanceCheckbox;