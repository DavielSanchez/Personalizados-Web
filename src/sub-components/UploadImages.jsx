const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]; // Obtén la imagen directamente
    if (!selectedImage) return;

    console.log("Imagen seleccionada: ", selectedImage);

    // Crear referencia a la imagen en Firebase Storage
    const storageRef = ref(storage, `images/${selectedImage.name}`);

    // Subir la imagen
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    // Activar estado de carga
    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Calcular el progreso de la subida
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(`Subida es ${progress}% completa`);
      },
      (error) => {
        console.error("Error subiendo la imagen: ", error);
        setUploading(false); // En caso de error, detener el estado de carga
      },
      () => {
        // Una vez completada la subida, obtener la URL de la imagen
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("URL de descarga obtenida: ", downloadURL);

          if (downloadURL) {
            // Pasar la URL al componente padre
            onImageUpload(downloadURL);
          } else {
            console.error("Error: No se pudo obtener la URL.");
          }

          // Subida completada, desactivar estado de carga
          setUploading(false);
          setProgress(0); // Reiniciar el progreso
        });
      }
    );
  };