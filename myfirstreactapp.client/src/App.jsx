import { Container, Row, Col, Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import TablaContacto from './components/TablaContacto';
import ModalContacto from './components/ModalContacto';
import './App.css';

function App() {

    const [contactos, setContactos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);

    const mostrarContactos = async () => {

        const response = await fetch("/api/contacto/List");

        if (response.ok) {
            const data = await response.json();
            setContactos(data)
        } else {
            console.log("error list");
        }
    }

    useEffect(() => {
        mostrarContactos();
    }, []);

    const guardarContacto = async (contacto) => {
        const response = await fetch("/api/contacto/Add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos();
        }
    }

    const editarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos();
        }
    }

    const eliminarContacto = async (id) => {

        var respuesta = window.confirm("Esta seguro que desea eliminar el contacto?");

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/contacto/Delete/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarContactos();
        }
    }

    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">
                                    Lista de contactos
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Button size="sm" color="success" onClick={(() => setMostrarModal(!mostrarModal))}>Nuevo Contacto</Button>
                                <hr></hr>
                                <TablaContacto
                                    data={contactos}
                                    setEditar={setEditar}
                                    mostrarModal={mostrarModal}
                                    setMostrarModal={setMostrarModal}
                                    eliminarContacto={eliminarContacto}>
                                </TablaContacto>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ModalContacto
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    guardarContacto={guardarContacto}
                    editar={editar}
                    setEditar={setEditar}
                    editarContacto={editarContacto}>
                </ModalContacto>
            </Container>
        </>
    );
}

export default App;