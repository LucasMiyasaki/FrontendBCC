import { Container } from "react-bootstrap";
import EnvioMensagem from "./EnvioMensagem";
import Batepapo from './Batepapo';
import Menu from './Menu';

export default function TelaBatepapo(props) {
    return (
        <Container>
            <Menu />
            <EnvioMensagem />
            <Batepapo/>
        </Container>
    )
}