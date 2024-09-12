import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, ModalFooter, Button, Label, Input } from 'reactstrap';
import propTypes from 'prop-types';

const modeloContacto = {
    idContacto: 0,
    nombre: "",
    correo: "",
    telefono: ""
}
function ModalContacto({ mostrarModal, setMostrarModal, guardarContacto, editar, setEditar, editarContacto }) {

    const [contacto, setContacto] = useState(modeloContacto);

    const actualizarDato = (e) => {
        console.log(e.target.name + ":" + e.target.value);
        setContacto(
            {
                ...contacto, [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (contacto.idContacto == 0) {
            guardarContacto(contacto);
        } else {
            editarContacto(contacto)
        }
        setContacto(modeloContacto)
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        } else {
            setContacto(modeloContacto)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {contacto.idContacto == 0 ? "Nuevo Contacto" : "Editar Contacto" }
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={contacto.nombre}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={contacto.telefono}></Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={ enviarDatos }>Guardar</Button>
                <Button color="danger" size="sm" onClick={ cerrarModal }>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
}

ModalContacto.propTypes = {
    mostrarModal: propTypes.func.isRequired,
    setMostrarModal: propTypes.func.isRequired,
    guardarContacto: propTypes.func.isRequired,
    editar: propTypes.func.isRequired,
    setEditar: propTypes.func.isRequired,
    editarContacto: propTypes.func.isRequired
}

export default ModalContacto;