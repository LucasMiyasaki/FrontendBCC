import { Button, Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarUsuarios } from "../redux/usuarioReducer";
import { useEffect } from "react";

export default function TabelaUsuario(props) {

    const { estado, mensagem, usuarios } = useSelector(state => state.usuario);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarUsuarios());
    }, [dispatch]);

    return (
        <Container>
            <Button type="button" onClick={() => {
                props.exibirFormulario(true);
            }}>Novo Usuario</Button>
            <Table>
                <thead>
                    <tr>
                        <th>Ícone</th>
                        <th>Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario) => {
                            return (<tr key={usuario.id}>
                                <td><img src={usuario.urlAvatar} alt="icone" width="50" height="50"/></td>
                                <td>{usuario.nickname}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}