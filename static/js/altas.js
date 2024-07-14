const URL = "http://127.0.0.1:5000/";

        document.getElementById('form-alta-producto').addEventListener('submit', agregarProducto);

        function agregarProducto(event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append('descripcion', document.getElementById('descripcion').value);
            formData.append('cantidad', document.getElementById('cantidad').value);
            formData.append('precio', document.getElementById('precio').value);

            fetch(URL + 'productos', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al agregar el producto.');
                    }
                })
                .then(data => {
                    alert('Producto agregado correctamente.');
                    limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al agregar el producto.');
                });
        }

        function limpiarFormulario() {
            document.getElementById('descripcion').value = '';
            document.getElementById('cantidad').value = '';
            document.getElementById('precio').value = '';
        }