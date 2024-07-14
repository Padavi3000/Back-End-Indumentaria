const URL = "http://127.0.0.1:5000/";

        document.addEventListener('DOMContentLoaded', obtenerProductos);

        function obtenerProductos() {
            fetch(URL + 'productos')
                .then(response => response.json())
                .then(data => mostrarProductos(data))
                .catch(error => {
                    console.error('Error al obtener los productos:', error);
                    alert('Error al obtener los productos.');
                });
        }

        function mostrarProductos(productos) {
            const listadoProductos = document.getElementById('listadoProductos');
            listadoProductos.innerHTML = '';

            if (productos.length === 0) {
                listadoProductos.innerHTML = '<p>No hay productos en el inventario.</p>';
                return;
            }

            productos.forEach(producto => {
                const divProducto = document.createElement('div');
                divProducto.classList.add('producto');

                const descripcion = document.createElement('p');
                descripcion.textContent = `Descripción: ${producto.descripcion}`;
                divProducto.appendChild(descripcion);

                const cantidad = document.createElement('p');
                cantidad.textContent = `Cantidad: ${producto.cantidad}`;
                divProducto.appendChild(cantidad);

                const precio = document.createElement('p');
                precio.textContent = `Precio: ${producto.precio}`;
                divProducto.appendChild(precio);

                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.addEventListener('click', () => eliminarProducto(producto.codigo));
                divProducto.appendChild(botonEliminar);

                listadoProductos.appendChild(divProducto);
            });
        }

        function eliminarProducto(codigo) {
            fetch(URL + 'productos/' + codigo, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        alert('Producto eliminado correctamente.');
                        obtenerProductos();
                    } else {
                        throw new Error('Error al eliminar el producto.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al eliminar el producto.');
                });
        }