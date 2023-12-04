import { useState, useEffect } from "react";
import { Container, Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarUsuarios, adicionarUsuarios } from "../redux/usuarioReducer";

export default function CadastroUsuario(props) {
    const usuarioVazio = {
        id: '',
        nickname: '',
        urlAvatar: '',
        dataIngresso: '',
        mensagens: []
    }

    const [usuario, setUsuario] = useState(usuarioVazio);
    const [formValidado, setFormValidado] = useState(false);

    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setUsuario({ ...usuario, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            dispatch(adicionarUsuarios(usuario));

            setUsuario(usuarioVazio);
            setFormValidado(false);
        }
        else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    useEffect(() => {
        dispatch(buscarUsuarios());
    }, [dispatch]);


    return (
        <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Nickname:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    id="nickname"
                                    name="nickname"
                                    value={usuario.nickname}
                                    onChange={manipularMudancas}
                                    />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nickname!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Icone:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Coloque a URL"
                                    id="urlAvatar"
                                    name="urlAvatar"
                                    value={usuario.urlAvatar}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a url do icone!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                        <Col md={6} offset={5} >
                            <Button type="submit" variant={"primary"}>{"Cadastrar"}</Button>
                        </Col>
                        <Col md={6} offset={5}>
                            <Button type="button" variant={"secondary"} onClick={() => {
                                props.exibirFormulario(false)
                            }
                            }>Voltar</Button>
                        </Col>
                    </Row>
            </Form>
        </Container>
    );
}