import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import AuthForm from "./AuthForm";

const Register = () => {
    return ( 
        <Container>
            <FormWrap>
                <AuthForm />
            </FormWrap>
        </Container>
     );
}
 
export default Register;