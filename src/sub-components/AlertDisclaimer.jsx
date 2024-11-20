import { useEffect} from 'react'
function AlertDisclaimer() {

    useEffect(() => {
        // Inicializar el modal y mostrarlo cuando el componente se cargue
        const modalElement = document.getElementById('welcomeModal');
        const bootstrapModal = new window.bootstrap.Modal(modalElement);
        bootstrapModal.show();
      }, []);

  return (

    <div className="modal fade" id="welcomeModal" tabIndex="-1" aria-labelledby="welcomeModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="welcomeModalLabel">Bienvenido/a</h5>
          </div>
          <div className="modal-body mb-3">
            Esta aplicacion aun se encuentra en etapa de desarrollo, el proposito de que este desplegada es para servir de demostracion y ejemplo.
            <p className="mt-3">Features en desarrollo:</p>
                <ol className="text-primary">
                    {/* <li>Carrito de compras</li> */}
                    <li>Productos en tendencia.</li>
                    <li>Busqueda avanzada de productos.</li>
                    <li>Apartado de cuentas y usuarios.</li>
                    <li>Proceso de pago (demo).</li>
                </ol>
                <code className="text-danger">V1.1</code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertDisclaimer