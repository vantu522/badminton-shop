document.addEventListener('DOMContentLoaded', () => {
    const categoryCheckboxes = document.querySelectorAll('.category-filter');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    const priceCheckboxes = document.querySelectorAll('.price-filter');
    priceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    const styleCheckboxes = document.querySelectorAll('.style-filter');
    styleCheckboxes.forEach(checkbox =>{
        checkbox.addEventListener('change', filterProducts);
    });

    const weightCheckboxes = document.querySelectorAll('.weight-filter');
    weightCheckboxes.forEach(checkbox =>{
        checkbox.addEventListener('change',filterProducts );
    });

    const stoneCheckboxes = document.querySelectorAll('.stone-filter');
    stoneCheckboxes.forEach(checkbox =>{
        checkbox.addEventListener('change', filterProducts);
    })

    function filterProducts() {
        const checkedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const checkedPrices = Array.from(priceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => ({
                min: parseInt(checkbox.getAttribute('data-min')),
                max: parseInt(checkbox.getAttribute('data-max'))
            }));
        
        const checkedStyles = Array.from(styleCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const checkedWeights = Array.from(weightCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const checkedStones = Array.from(stoneCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox =>checkbox.value);

        const products = document.querySelectorAll('.col3');

        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            const productPrice = parseInt(product.getAttribute('data-price'));
            const productStyle = product.getAttribute('data-style');
            const productWeight = product.getAttribute('data-weight');
            const productStone = product.getAttribute('data-stone');

            const categoryMatch = checkedCategories.length === 0 || checkedCategories.includes(productCategory);
            const priceMatch = checkedPrices.length === 0 || checkedPrices.some(price => productPrice >= price.min && productPrice <= price.max);
            const styleMatch = checkedStyles.length === 0 || checkedStyles.includes(productStyle);
            const weightMatch = checkedWeights.length === 0 || checkedWeights.includes(productWeight);
            const stoneMatch = checkedStones.length === 0 || checkedStones.includes(productStone);


            if (categoryMatch && priceMatch && styleMatch && weightMatch && stoneMatch) {
                product.classList.remove('fade-out');
                product.classList.add('fade-in');
                product.classList.remove('hide');
            } else {
                product.classList.remove('fade-in');
                product.classList.add('fade-out');
                setTimeout(() => {
                    product.classList.add('hide');
                }, 500);
            }
        });
    }
});

//DROP LIST
document.getElementById('drop').addEventListener('change', function(){
    const productList = document.querySelector(".row");
    const products = Array.from(productList.children);
    console.log(products);


    if (this.value === "priceDesc"){
        products.sort((a,b) => b.getAttribute('data-price') - a.getAttribute('data-price'));
    } else if(this.value === "priceAsc") {
        products.sort((a, b) => a.getAttribute('data-price') - b.getAttribute('data-price'));
    } else if(this.value === "new"){
        products.sort((a,b) => new Date(b.getAttribute('data-date')) - new Date (a.getAttribute('data-date')))
    } else if(this.value === "old"){
        products.sort((a,b) => new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date')));
    }

    

    products.forEach(product => productList.appendChild(product))
   
})

// xem thêm

function toggleContent(){

    var div1 = document.getElementById('div1');
    var div2 = document.getElementById('div2');
    var div3 = document.getElementById('div3');
    var div4 = document.getElementById('div4');
    var div5 = document.getElementById('div5');
    var brandInfo = document.querySelector('.brand-info');
    var toggleButton = document.getElementById("toggleButton");




    if (div2.classList.contains('hiddens')){
        div1.classList.remove('hiddens');
        div2.classList.remove('hiddens');
        div3.classList.remove('hiddens');
        div4.classList.remove('hiddens');
        div5.classList.remove('hiddens');
        brandInfo.classList.add('active');
        toggleButton.innerHTML = "Thu gọn <span class='arrow'>&#9650;</span>";



    } else{
        div1.classList.add('hiddens');
        div2.classList.add('hiddens');
        div3.classList.add('hiddens');
        div4.classList.add('hiddens');
        div5.classList.add('hiddens');
        brandInfo.classList.remove('active');
        toggleButton.innerHTML = "Xem thêm <span class='arrow'>&#9660;</span>";


    }
}

// Scroll To Top
document.addEventListener('DOMContentLoaded', () => {
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
});
