import { Container } from "react-bootstrap";
import Pagina from "./Pagina";
import { useState } from "react";
import CadastroUsuario from "./CadastroUsuario";
import TabelaUsuario from "./TabelaUsuario";

export default function TelaUsuario(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    exibirFormulario ? <CadastroUsuario exibirFormulario={setExibirFormulario}
                    />
                        :
                        <TabelaUsuario exibirFormulario={setExibirFormulario}
                        />
                }
            </Pagina>
        </Container>
    )
}