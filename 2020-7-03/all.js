let app = new Vue({
    el:'#app',
    data:{
        products:[
            {   
                id: 1593826171806,
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
                    comments: [
                        {
                            id: 1,
                            stars: 5,
                            name: '小明',
                            comment: '我喜歡吃阿姨煮的,也喜歡吃小美煮的'
                        },
                        {
                            id: 2,
                            stars: 1,
                            name: '小美',
                            comment: '小明吃過阿姨煮的,我只管給差評'
                        },
                    ]
                }
            },
            {   
                id: 1593826197355,
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
                    comments: [
                        {
                            id: 1,
                            stars: 5,
                            name: '漂亮阿姨',
                            comment: '今天煮青菜好呢,還是煮肉呢'
                        },
                        {
                            id: 2,
                            stars: 1,
                            name: '小美',
                            comment: '阿姨煮過的菜,我絕對不碰'
                        },
                    ]
                }
            }

        ],
        tempProduct:{},
        tempPos: 0,
        tempComment:{},
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
                    break;               
                
                case 'commet':
                    this.tempProduct = Object.assign({},product);
                    this.tempComment = this.tempProduct.comments[this.tempPos];
                    $('#commetProductModal').modal('show');
                default:
                break;
            }
        },
        addProduct(){
            this.tempProduct.id = new Date().getDate();
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
        },
        nextComment(){
            if(this.tempPos === this.tempProduct.comments.length -1){
                this.tempPos = 0
            }else{
                this.tempPos += 1;
            }
            this.tempComment = this.tempProduct.comments[this.tempPos];
        },
        preComment(){
            if(this.tempPos === 0) {
                this.tempPos = this.tempProduct.comments.length -1
            }else{
                this.tempPos -= 1;
            }
            this.tempComment = this.tempProduct.comments[this.tempPos];
        },
        deleteMessage(id){
            this.tempProduct.comments.forEach((item, index) => {
                if(item.id === id){
                    this.tempProduct.comments.splice(index, 1);
                }
            })
            this.tempComment = this.tempProduct.comments[0];
        }
        
    },
}) 