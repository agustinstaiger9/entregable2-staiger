document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const cartList = document.getElementById('cart-list');
    const clearCartBtn = document.getElementById('clear-cart');
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Renderizar el carrito
    const renderCart = () => {
        cartList.innerHTML = '';
        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.onclick = () => removeProduct(index);
            li.appendChild(deleteBtn);
            cartList.appendChild(li);
        });
    };

    // Agregar productos al carro
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = productNameInput.value.trim();
        const price = parseFloat(productPriceInput.value);
        if (name && !isNaN(price)) {
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            productForm.reset();
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    });

    // Eliminar producto
    const removeProduct = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    // Vaciar carrito
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    });


    renderCart();
});
