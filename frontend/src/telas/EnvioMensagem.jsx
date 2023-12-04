import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { adicionarMensagem, buscarMensagem } from "../redux/mensagemReducer";
import Pagina from "./Pagina";

export default function EnvioMensagem(props) {
    const mensagemVazia = {
        id: 0,
        dataHora: '',
        lida: false,
        mensagem: '',
        usuario: {
            id: '',
            nickname: '',
            urlAvatar: '',
            dataIngresso: '',
            mensagens: []
        }
    }

    const [msg, setMsg] = useState(mensagemVazia);
    const [formValidado, setFormValidado] = useState(false);

    const { estado: estadoUsu,
        mensagem: mensagemUsu,
        usuarios } = useSelector((state) => state.usuario);

    const { estado, mensagem, msgs } = useSelector((state) => state.mensagem);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarMensagem());
    }, [dispatch]);

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setMsg({ ...msg, [componente.name]: componente.value });
    }

    function selecionaUsuario(e) {
        const componente = e.currentTarget;
        setMsg({
            ...msg, usuario: {
                "id": componente.value,
                "nickname": componente.options[componente.selectedIndex].text
            }
        });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            dispatch(adicionarMensagem(msg));

            setMsg(mensagemVazia);

            e.stopPropagation();
            e.preventDefault();
        }
    }

    return (
        <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Select
                                aria-label="Usuario:"
                                id='usuario'
                                name='usuario'
                                onChange={selecionaUsuario}
                                value={msg.usuario.id}
                                requerid>
                                <option value="0" selected>Selecione um usuario</option>
                                {
                                    usuarios?.map((usuario) =>
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nickname}
                                        </option>
                                    )
                                }
                            </Form.Select>
                            <FloatingLabel
                                label="Mensagem:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="mensagem"
                                    name="mensagem"
                                    value={msg.mensagem}
                                    onChange={manipularMudancas} />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Digite uma mensagem!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{"Enviar"}</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}