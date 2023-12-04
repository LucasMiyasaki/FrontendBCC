import { Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { buscarMensagem } from "../redux/mensagemReducer";

export default function TabelaUsuario(props) {

    const { estado, mensagem, msgs } = useSelector(state => state.mensagem);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarMensagem());
    }, [dispatch]);

    return (
        <Container>
            <Table>
                <tbody>
                    {
                        msgs.map((msg) => {
                            return (<tr key={msg.id}>
                                <td>{msg.usuario.nickname}</td>
                                <td>{msg.mensagem}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}