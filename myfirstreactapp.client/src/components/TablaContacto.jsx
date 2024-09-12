import { Table, Button } from "reactstrap";
import PropTypes from 'prop-types';

function TablaContacto({ data, setEditar, mostrarModal, setMostrarModal, eliminarContacto }) {

    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idContacto}>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.telefono}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2" onClick={ () => enviarDatos(item) }>Edit</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarContacto(item.idContacto) }>Delete</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    );
}

TablaContacto.propTypes = {
    data: PropTypes.array.isRequired, // Replace 'any' with the specific type of 'data' (e.g., string, number, array, object)
    setEditar: PropTypes.func.isRequired,
    mostrarModal: PropTypes.func.isRequired,
    setMostrarModal: PropTypes.func.isRequired,
    eliminarContacto: PropTypes.func.isRequired
};

export default TablaContacto;