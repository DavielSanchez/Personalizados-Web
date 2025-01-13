import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Suscribe() {
  const MySwal = withReactContent(Swal);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expresión regular para validar correos
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!newName.trim() || !newEmail.trim()) {
      MySwal.fire({
        title: "Campos vacíos",
        text: "Por favor, completa todos los campos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return false;
    }

    if (!validateEmail(newEmail)) {
      MySwal.fire({
        title: "Correo inválido",
        text: "Por favor, introduce un correo electrónico válido.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return false;
    }

    return true;
  };

  const sendEmail = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/newsletter/emails/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: newName,
            Email: newEmail,
            createdAt: new Date(),
          }),
        }
      );

      if (response.ok) {
        MySwal.fire({
          title: "¡Suscripción exitosa!",
          text: "Gracias por suscribirte a nuestro boletín.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        clearForm();
      } else {
        throw new Error("Error al enviar los datos");
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: "No se pudo completar la suscripción. Intenta nuevamente más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      sendEmail();
    }
  };

  const clearForm = () => {
    setNewEmail("");
    setNewName("");
  };

  return (
    <div className="col-md-4 mb-5">
      <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control border-0 py-4"
            placeholder="Your Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control border-0 py-4"
            placeholder="Your Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary btn-block border-0 py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Subscribe Now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Suscribe;
