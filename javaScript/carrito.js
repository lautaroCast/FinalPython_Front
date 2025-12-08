document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');

    // Inicializamos el estado del carrito
    let cart = [];

    // --- A. Función para alternar la visibilidad del desplegable ---
    cartIcon.addEventListener('click', (e) => {
        // Previene que el click en el botón cierre inmediatamente el desplegable
        e.stopPropagation();
        cartDropdown.classList.toggle('active');
    });

    // Cierra el desplegable si se hace click fuera de él
    document.addEventListener('click', (e) => {
        if (!cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
            cartDropdown.classList.remove('active');
        }
    });


    // --- B. Función para actualizar la vista del carrito (UI) ---
    function updateCartUI() {
        // 1. Limpiar la lista actual
        cartItemsList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            // Mostrar mensaje de carrito vacío
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'Tu carrito está vacío.';
            cartItemsList.appendChild(emptyMessage);
        } else {
            // 2. Recorrer los ítems y crear los <li>
            cart.forEach(item => {
                const li = document.createElement('li');
                // Formato simple: Nombre x Cantidad | Precio Total por Item
                const itemPrice = item.price * item.quantity;
                li.innerHTML = `
                    <span>${item.name} (${item.quantity})</span>
                    <span>$${itemPrice.toFixed(2)}</span>
                `;
                cartItemsList.appendChild(li);

                total += itemPrice;
            });
        }

        // 3. Actualizar contador y total
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    }


    // --- C. Función de EJEMPLO para añadir un producto ---
    // En tu e-commerce real, esta función se llamaría cuando el usuario hace clic en "Añadir al Carrito"
    window.addToCart = function(productName, productPrice) {
        // 1. Buscar si el producto ya existe
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            // Si existe, solo incrementamos la cantidad
            existingItem.quantity += 1;
        } else {
            // Si es nuevo, lo agregamos al array
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        // 2. Actualizar la vista del desplegable
        updateCartUI();

        // OPCIONAL: Mostrar el desplegable después de añadir un ítem
        cartDropdown.classList.add('active');
    };

    // Inicializar la vista (muestra el '0' y el mensaje de vacío)
    updateCartUI();
});