;(function(){
    var obj = {
        data: {
        uuid: '4bf3ed9e-2f96-4927-8d03-2cc23ae42f7c',
        products: [],
        categories: [],
        },
        apiPath: 'https://course-ec-api.hexschool.io/',
        getData: function() {
        const vm = this;
        const url = `${vm.apiPath}api/${this.data.uuid}/ec/products`;
    
        axios.get(url)
            .then(res => {
            vm.data.products = res.data.data;
            vm.getCategory();
            vm.render();
            vm.eventListener();
            })
        },
        getCategory: function(){
            let products = this.data.products;
            let categories = [];
            products.forEach(product => categories.push(product.category))
            this.data.categories = categories.filter((category, index, arr) => {return arr.indexOf(category) === index});
        },
        render: function(categoryFilter = 'all') {
            const app = document.getElementById('app');
            const categoryList = document.querySelector('.category');
            let products = this.data.products;
            let categories = this.data.categories;
            let str = '';
            // 全部產品列表畫面
            if(categoryFilter === 'all'){
                products.forEach(product => {
                    str += `
                    <div class="card mb-6">
                        <img class="card-img-top product-img" style="background-image: url(${product.imageUrl[0]});>
                        <div class="card-body">
                            <h3 class="card-title p-3">${product.title}</h3>
                            <p class="card-text p-3">${product.content}</p>
                            <div class="d-flex justify-content-between p-3">
                                <div class="d-flex justify-content-end align-items-center">
                                    <span class="text-red mr-4">$ ${product.price} 元</span>
                                    <span class="lineThrough">$ ${product.origin_price} 元</span>
                                </div>
                                <div>
                                    <a href="#" class="btn btn-primary px-3">加入購物車</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
                app.innerHTML = str;
                //產品分類畫面
                str = '<a href="#" class="list-group-item list-group-item-action list-group-item-secondary active" data-category="all">全部商品</a>';
                categories.forEach(category => {
                    str += `
                        <a href="#" 
                        class="list-group-item list-group-item-action list-group-item-secondary"
                        data-category="${category}">
                        ${category}</a>
                    `;
                })
                categoryList.innerHTML = str;
                //如果選擇了category
            }else{
                products.forEach(product => {
                    if(product.category === categoryFilter){
                        str += `
                        <div class="card mb-3">
                            <img class="card-img-top product-img" style="background-image: url(${product.imageUrl[0]});>
                            <div class="card-body">
                                <h3 class="card-title p-3">${product.title}</h3>
                                <p class="card-text p-3">${product.content}</p>
                                <div class="d-flex justify-content-between p-3">
                                    <div class="d-flex justify-content-end align-items-center">
                                        <span class="text-red mr-4">$ ${product.price} 元</span>
                                        <span class="lineThrough">$ ${product.origin_price} 元</span>
                                    </div>
                                    <div>
                                        <a href="#" class="btn btn-primary px-3">加入購物車</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }
                });
                app.innerHTML = str;
                //產品分類畫面
                str = '<a href="#" class="list-group-item list-group-item-action list-group-item-secondary" data-category="all">全部商品</a>';
                categories.forEach(category => {
                    str += `
                        <a href="#" 
                        class="list-group-item list-group-item-action list-group-item-secondary ${categoryFilter === category ? 'active' : ''} "
                        data-category="${category}"
                        >
                        ${category}</a>
                    `;
                })
                categoryList.innerHTML = str;  
            }
        },
        eventListener: function(){
            const categoryList = document.querySelector('.category')
            const vm = this;
            categoryList.addEventListener('click', categoryHandler)
            function categoryHandler(e){
                if(e.target.nodeName === 'A'){
                    e.preventDefault();
                    vm.render(e.target.dataset.category);
                }
            }
        }
    }
    obj.getData();
})();