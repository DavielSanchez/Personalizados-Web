import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Reviews(P) {
  const MySwal = withReactContent(Swal);

  // Estados para los datos de la reseña
  const [reviewRating, setReviewRating] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [productId, setProductId] = useState(`${P.productId}`); // Establece el id del producto que se está reseñando
  const [reviewDate] = useState(new Date().toISOString()); // Fecha actual
  const [authorId, setAuthorId] = useState("67107f4c49d6fd46615cd862"); // El id del autor, si lo tienes

  // Datos para enviar en el POST
  const data = {
    reviewRating: reviewRating,
    reviewContent: reviewContent,
    productId: P.productId,
    reviewDate: reviewDate,
    authorId: authorId,
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de página
    console.log('Data to send:', data);
    console.log(P.productId)
    // Validación básica
    if (!reviewRating || !reviewContent) {
      return MySwal.fire({
        title: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }else{
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/reviews/add`, {
          method: 'POST', // Especificar el método POST
          headers: {
            'Content-Type': 'application/json', // Especificar el tipo de contenido
          },
          body: JSON.stringify(data), // Convertir los datos a formato JSON
        });
  
        if (response.ok) {
    MySwal.fire({
        title: 'Reseña guardada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    }).then(() => {
        if (P.onReviewAdded) {
            P.onReviewAdded();
        }
        // Limpiar el formulario
        setReviewRating('');
        setReviewContent('');
    });
} else {
          throw new Error('Error al enviar la reseña');
        }
        console.log("bien")
      } catch (error) {
        console.error('Error:', error);
        MySwal.fire({
          title: 'Error al enviar la reseña',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.log(error)
      }
    }

    
  };

  return (
    <div className="col-md-6">
      <h4 className="mb-4">Deja un comentario</h4>
      <small>Completa todos los campos marcados con *</small>

      <form onSubmit={handleSubmit}>
      <div className="d-flex my-3 align-center">
  <p className="mb-0 mr-2">Tu valoración * :</p>
  <div className="rating text-primary">
    <input
      value="5"
      name="rate"
      id="star5"
      type="radio"
      onChange={(e) => {
        setReviewRating(e.target.value);// Muestra un alert con el valor actual
      }}
    />
    <label title="5 estrellas" htmlFor="star5"></label>

    <input
      value="4"
      name="rate"
      id="star4"
      type="radio"
      onChange={(e) => {
        setReviewRating(e.target.value);
      }}
    />
    <label title="4 estrellas" htmlFor="star4"></label>

    <input
      value="3"
      name="rate"
      id="star3"
      type="radio"
      onChange={(e) => {
        setReviewRating(e.target.value);
      }}
    />
    <label title="3 estrellas" htmlFor="star3"></label>

    <input
      value="2"
      name="rate"
      id="star2"
      type="radio"
      onChange={(e) => {
        setReviewRating(e.target.value);
      }}
    />
    <label title="2 estrellas" htmlFor="star2"></label>

    <input
      value="1"
      name="rate"
      id="star1"
      type="radio"
      onChange={(e) => {
        setReviewRating(e.target.value);
      }}
    />
    <label title="1 estrella" htmlFor="star1"></label>
  </div>
</div>



        <div className="form-group">
          <label htmlFor="message">Tu comentario *</label>
          <textarea
            id="message"
            cols="30"
            rows="5"
            className="form-control"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          ></textarea>
        </div>
{/* 
        <div className="form-group">
          <label htmlFor="productId">ID del producto *</label>
          <input
            id="productId"
            type="text"
            className="form-control"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="authorId">ID del autor *</label>
          <input
            id="authorId"
            type="text"
            className="form-control"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          />
        </div> */}

        <div className="form-group mb-0">
          <input type="submit" value="Deja tu comentario" className="btn btn-primary px-3" />
        </div>
      </form>
    </div>
  );
}

export default Reviews;
