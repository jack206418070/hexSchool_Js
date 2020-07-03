let app = new Vue({
    el:'#app',
    data:{
        products:[
            {   
                id: 1,
                title: '活動白蝦',
                category: '海鮮',
                content: '活體冷洞,保證新鮮,甜味十足',
                description: '只要泡水後,直接清蒸或者下鍋烹調',
                imageUrl: 'http://14840.cyberbiz.tw/media/W1siZiIsIjE0ODQwL3Byb2R1Y3RzLzMwNzA0NTg0L2l0ZW0xXzg0MmYzNTZjMzU0MjIxMmQwMjZjLmpwZWciXSxbInAiLCJ0aHVtYiIsIjYwMHg2MDAiXV0.jpeg?sha=a1f3ca1c333f4002',
                enabled: true,
                origin_price: 580,
                price: 480,
                unit: '盒',
                options: {
                    stars: 4,
                    comments: [{
                      name: '小明',
                      avator: 'https://images.app.goo.gl/sSCJ6QwFgpZKKC1d8',
                      comment: '吃了蝦子,到底要找小美還是漂亮阿姨'
                    }]
                }
            },
            {   
                id: 2,
                title: 'A菜',
                category: '蔬菜水果',
                content: '產地直送,保證新鮮',
                description: '買回去後,只需要沖水後川燙',
                imageUrl: 'http://14840.cyberbiz.tw/media/W1siZiIsIjE0ODQwL3Byb2R1Y3RzLzMwNzA0OTkxL0FcdTgzZGNfZmRiYTNkOTY4ZGQ2MzA0NGZhMDkuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=b81cae660f79bd47',
                enabled: true,
                origin_price: 40,
                price: 20,
                unit: '把',
                options: {
                    stars: 5,
                    comments: [{
                      name: '漂亮阿姨',
                      avator: 'https://images.app.goo.gl/ZgZL85guTZyMsDkD9',
                      comment: '今天煮青菜好呢,還是煮肉呢'
                    }]
                }
            }

        ],
        tempProduct:{},
        modalType:'',
    },
    methods:{
        openModal(type, product){
            this.modalType = type;
            switch(type){
                case 'add':
                    $('#productModal').modal('show');
                break;

                case 'edit':
                    this.tempProduct = Object.assign({},product);
                    $('#productModal').modal('show');
                break;

                case 'delete':
                    this.tempProduct = Object.assign({},product);
                    $('#delProductModal').modal('show');
                default:
                break;
            }
        },
        addProduct(){
            this.tempProduct.id = this.products.length + 1;
            this.products.push(this.tempProduct);
            this.tempProduct = {};
            $('#productModal').modal('hide');
        },
        editProduct(){
            const id = this.tempProduct.id;
            this.products.forEach((product, index) => {
                console.log(id, product.id, index);
                if(product.id === id){
                    this.products[index] = this.tempProduct;
                }
            })
            this.tempProduct = {};
            $('#productModal').modal('hide');
        },
        deleteProduct(id){
            this.products.forEach((product, index) => {
                if(product.id === id){
                    this.products.splice(index, 1);
                }
            })
            this.tempProduct = {};
            $('#delProductModal').modal('hide');
        }
        
    },
}) 