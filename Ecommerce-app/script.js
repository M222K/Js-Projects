document.addEventListener("DOMContentLoaded",()=>{
    //create products that store products dynamically can be updated later 
    const products=[
        {id:1,name:"Product-1",price:29.99},
        {id:2,name:"Product-2",price:39.99},
        {id:3,name:"Product-3",price:49.99},
    ]

    const cart=[]; //cart to store added products

    const productList=document.getElementById('product-list');
    const cartItems= document.getElementById('cart-items');
    const emptyCartMessage=document.getElementById('empty-cart');
    const cartTotal=document.getElementById('cart-total');
    const totalPrice=document.getElementById('total-price');
    const checkoutBtn=document.getElementById('checkout-btn');

    //function to render products by iterating over products array
    products.forEach(product=>{
        const productDiv=document.createElement('div');
        productDiv.className='product';
        productDiv.innerHTML=`
        <span>${product.name}  $${product.price}</span>
        <button id="${product.id}" class="button">Add to Cart</button>`;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click",(e)=>{
        if(e.target.tagName==="BUTTON"){
            //we need to find the product by id
            console.log(typeof e.target.id); //we have product id as number
            const productId=parseInt(e.target.id);
            const productToAdd=products.find(product=>product.id===productId);
            console.log(productToAdd);
            addTocart(productToAdd);
        }else{
            return;
        }
    });

    function addTocart(product){
        cart.push(product);
        console.log(cart);
        renderCart();
    }

    function renderCart(){
        cartItems.innerText="";
        let total=0;
        if(cart.length>0){
            emptyCartMessage.classList.add("hidden");
            cartTotal.classList.remove("hidden");
            cart.forEach((item,index)=>{
                total+=item.price;
                const cartItem=document.createElement('div');
                cartItem.innerHTML=`
                <span>${item.name} $${item.price}</span>`;
                cartItems.appendChild(cartItem);
                totalPrice.textContent=total.toFixed(2);
            })

        }else{
            emptyCartMessage.classList.remove("hidden");
        }
    }

    checkoutBtn.addEventListener("click",()=>{
        alert("Order placed successfully!");
        totalPrice.textContent="0.00";
        cart.length=0;
        renderCart();
    })
})