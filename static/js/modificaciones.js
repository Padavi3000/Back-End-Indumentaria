const URL = "http://127.0.0.1:5000/";
        let descripcion = '';
        let cantidad = '';
        let precio = '';
        let mostrarDatosProducto = false;

        document.getElementById('form-obtener-producto').addEventListener('submit', obtenerProducto);
        document.getElementById('form-guardar-cambios').addEventListener('submit', guardarCambios);

        function obtenerProducto(event) {
            event.preventDefault();
            codigo = document.getElementById('codigo').value;
            fetch(URL + 'productos/' + codigo)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al obtener los datos del producto.')
                    }
                })
                .then(data => {
                    descripcion = data.descripcion;
                    cantidad = data.cantidad;
                    precio = data.precio;
                    mostrarDatosProducto = true;
                    mostrarFormulario();
                })
                .catch(error => {
                    alert('Código no encontrado.');
                });
        }

        function mostrarFormulario() {
            if (mostrarDatosProducto) {
                document.getElementById('descripcionModificar').value = descripcion;
                document.getElementById('cantidadModificar').value = cantidad;
                document.getElementById('precioModificar').value = precio;
                document.getElementById('datos-producto').style.display = 'block';
            } else {
                document.getElementById('datos-producto').style.display = 'none';
            }
        }

        function guardarCambios(event) {
            event.preventDefault();

            const formData = new FormData();
            formData.append('descripcion', document.getElementById('descripcionModificar').value);
            formData.append('cantidad', document.getElementById('cantidadModificar').value);
            formData.append('precio', document.getElementById('precioModificar').value);

            fetch(URL + 'productos/' + codigo, {
                method: 'PUT',
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al guardar los cambios del producto.')
                    }
                })
                .then(data => {
                    alert('Producto actualizado correctamente.');
                    limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar el producto.');
                });
        }

        function limpiarFormulario() {
            document.getElementById('codigo').value = '';
            document.getElementById('descripcionModificar').value = '';
            document.getElementById('cantidadModificar').value = '';
            document.getElementById('precioModificar').value = '';

            codigo = '';
            descripcion = '';
            cantidad = '';
            precio = '';
            mostrarDatosProducto = false;

            document.getElementById('datos-producto').style.display = 'none';
        }