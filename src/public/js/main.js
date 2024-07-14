document.addEventListener('DOMContentLoaded', () => {
    // Cuộn để ẩn
    let lastScrollY = window.scrollY;
    const scrollThreshold = 120; // Ngưỡng cuộn

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('header');
        if (window.scrollY > scrollThreshold) {
            if (window.scrollY > lastScrollY) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
        } else {
            navbar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    // Cuộn lên đầu trang
    const ScrollToTop = document.querySelector('.btnScrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            ScrollToTop.classList.add('active');
        } else {
            ScrollToTop.classList.remove('active');
        }
    });

    ScrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    


    // Giỏ hàng
    let cartIcon = document.querySelector('#cart-icon');
    let cart = document.querySelector('.cart');
    let closeCart = document.querySelector('#close-cart');
    let overlay = document.querySelector('.overlay');

    // Mở giỏ hàng
    cartIcon.onclick = () => {
        cart.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Đóng giỏ hàng
    closeCart.onclick = () => {
        cart.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Xử lý giỏ hàng
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    // Tạo hàm
    function ready() {
        // Xóa sản phẩm khỏi giỏ
        var removeCartButtons = document.getElementsByClassName('cart-remove');
        for (var i = 0; i < removeCartButtons.length; i++) {
            var button = removeCartButtons[i];
            button.addEventListener('click', removeCartItem);
        }
        // Thay đổi số lượng
        var quantityInputs = document.getElementsByClassName('cart-quantity');
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged);
        }
        // Thêm sự kiện click cho nút "Thêm vào giỏ hàng"
        var addCartButtons = document.getElementsByClassName('add-cart');
        for (var i = 0; i < addCartButtons.length; i++) {
            var button = addCartButtons[i];
            button.addEventListener('click', addCartClicked);
        }

        // Nút mua hàng
        document
            .getElementsByClassName('btn-buy')[0]
            .addEventListener('click', buyButtonClicked);
    }

    // Nút mua hàng
    function buyButtonClicked() {
        
        var cartContent = document.getElementsByClassName('cart-content')[0];
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
        updateCartCount();
    }
    function showNotification() {
        const notification = document.getElementById('notification')
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3500); // Thông báo sẽ tự động ẩn sau 3.5 giây
    }

    // Thêm vào giỏ hàng
    function addCartClicked(event) {
        var button = event.target;
        var shopProducts = button.closest('.col3');
        var title = shopProducts.querySelector('.products-name a').innerText;
        var price = shopProducts.querySelector('.price').innerText;
        var productImg = shopProducts.querySelector('.products-img img').src;

        if (addProductToCart(title, price, productImg)) {
            updateTotal();
            updateCartCount();
            showNotification();
        }
    }

    // Cập nhật số lượng giỏ hàng
    function updateCartCount() {
        var cartContent = document.getElementsByClassName('cart-content')[0];
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        var totalCount = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var quantityElement = cartBoxes[i].getElementsByClassName('cart-quantity')[0];
            var quantity = parseInt(quantityElement.value);
            totalCount += quantity;
        }
        document.getElementById('cart-count').innerText = totalCount;
    }

    // Xóa sản phẩm khỏi giỏ
    function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        updateTotal();
        updateCartCount();
    }

    // Thay đổi số lượng
    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
        updateCartCount();
    }

    function addProductToCart(title, price, productImg) {
        var cartItems = document.getElementsByClassName('cart-content')[0];
        var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
        for (var i = 0; i < cartItemsNames.length; i++) {
            if (cartItemsNames[i].innerText === title) {
                alert('Bạn đã thêm sản phẩm này vào giỏ');
                return false;
            }
        }

        var cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box');
        var cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>`;
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox
            .getElementsByClassName('cart-remove')[0]
            .addEventListener('click', removeCartItem);
        cartShopBox
            .getElementsByClassName('cart-quantity')[0]
            .addEventListener('change', quantityChanged);
        return true;
    }

    // Cập nhật tổng tiền
    function updateTotal() {
        var cartContent = document.getElementsByClassName('cart-content')[0];
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        var total = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName('cart-price')[0];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            var price = parseFloat(priceElement.innerText.replace(/\./g, '').replace(' đ', ''));
            var quantity = quantityElement.value;
            total += price * quantity;
        }
        document.querySelector('.total-price').innerText = total.toLocaleString('vi-VN') + ' đ';
    }







    // Slider
    const myslide = document.querySelectorAll('.myslider');
    const dot = document.querySelectorAll('.dot');

    let counter = 1;
    slideFun(counter);

    let timer = setInterval(autoslide, 8000);
    document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
    document.querySelector('.next').addEventListener('click', () => plusSlides(1));

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlider(index + 1));
});

    function slideFun(n) {
        let i;
        for (i = 0; i < myslide.length; i++) {
            myslide[i].style.display = 'none';
        }
        for (i = 0; i < dot.length; i++) {
            dot[i].classList.remove('active');
        }
        if (n > myslide.length) {
            counter = 1;
        }
        if (n < 1) {
            counter = myslide.length;
        }
        myslide[counter - 1].style.display = "block";
        dot[counter - 1].classList.add('active');
    }

    function autoslide() {
        counter += 1;
        slideFun(counter);
    }

    function plusSlides(n) {
        counter += n;
        slideFun(counter);
        resetTimer();
    }

    function currentSlider(n) {
        counter = n;
        slideFun(counter);
        resetTimer();
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(autoslide, 8000);
    }


    // // Bộ lọc
    // const filterButtons = document.querySelectorAll('.filter_button button');

    // // Định nghĩa filterCards
    // const filterCards = e => {
    //     const activeFilter = document.querySelector(".btn-filter.act");
    //     if (activeFilter) {
    //         activeFilter.classList.remove('act');
    //     }
    //     e.target.classList.add("act");

    // };

    // Thêm sự kiện click
    // filterButtons.forEach(button => button.addEventListener('click', filterCards));

    // Bộ lọc
    const navItems = document.querySelectorAll('.text .text-head');
   

    
    
    
});
