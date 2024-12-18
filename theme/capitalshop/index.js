    // Function to get categories
    async function GetCategories() {
      const url = 'https://localhost:44332/api/Category';
      var response = await fetch(url);
      var result = await response.json();
      var container = document.getElementById('container');
      result.forEach(element => {
          container.innerHTML += `
             <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                  <div class="single-items mb-20">
                      <div class="items-img">
                          <img src="../../../../Backend/Masterpiece/Masterpiece/Uploads/${element.categoryImage}" alt="${element.categoryImage}">
                      </div>
                      <div class="items-details">
                          <h4>${element.categoryName}</h4>
                          <a href="shopp.html" onclick="stores(${element.categoryId})" class="browse-btn">تسوق الآن</a>
                      </div>
                  </div>
              </div>
              <br><br>`;
      });
  }

 

  function stores(x) {
      localStorage.setItem("CategoryId", x);
  
  }


  // Function to get products
  async function getProducts(endpoint, categoryId) {
      try {
          const url = `https://localhost:44332/api/Products/${endpoint}?categoryId=${categoryId}`;
          const response = await fetch(url);
          const products = await response.json();
          displayProducts(products);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  }

  // Function to display products
  function displayProducts(products) {
      const container = document.getElementById('products-container');
      container.innerHTML = '';
      if (products.length > 0) {
          products.forEach(product => {
            const currentPrice = product.priceWithDiscount ? 
            (product.price - (product.price * (product.priceWithDiscount / 100))).toFixed(2) : 
            product.price.toFixed(2);
        const oldPrice = product.priceWithDiscount ? product.price.toFixed(2) : null; // إذا لم يكن هناك خصم، اجعل السعر القديم null
            // تحديث محتويات الصفحة باستخدام innerHTML
              container.innerHTML += `

                  <div class="col-lg-3 col-md-6 col-sm-6 mix new-arrivals">
                      <div class="product__item">
                          <div class="product__item__pic" style="background-image: url('../../../../Backend/Masterpiece/Masterpiece/Uploads/${product.image}');">
                              <span class="label">${product.label || 'جديد'}</span>
                              <ul class="product__hover">
                                  <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                                  <li><a href="#"><img src="img/icon/compare.png" alt=""><span>مقارنة</span></a></li>
                                  <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                              </ul>
                          </div>
                          <div class="product__item__text">
                              <h6>${product.name || 'منتج غير معروف'}</h6>
                              <a href="cart.html"  onclick="addToCart(${product.productId}, '${product.name}',${currentPrice}, '${product.image}')">+ أضف إلى السلة</a>
                              <div class="rating">${renderStars(product.rating || 0)}</div>
                   <div class="price_box">
                        <span id="currentPrice" class="current_price">JD${currentPrice}</span>
                        ${oldPrice ? `<span id="oldPrice" class="old_price" style="text-decoration: line-through;">JD${oldPrice}</span>` : ''}
                    </div>
                            </div>
                          </div>
                      </div>
                  </div>`;
          });
      } else {
          container.innerHTML = '<p>لا توجد منتجات لهذه الفئة حالياً.</p>';
      }
  }

  // Function to render star ratings
  function renderStars(rating) {
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
          starsHtml += `<i class="fa fa-star${i <= rating ? '' : '-o'}"></i>`;
      }
      return starsHtml;
  }

  // Call GetCategories on page load
  window.onload = function () {
      GetCategories();
      getProducts('recommendations', 46);
  };
////////////////////////////////////
// قسم عرض العبايات

async function loadTopFiveAbayas() {
    try {
debugger
        let response = await fetch('https://localhost:44332/api/Products/GetTopFiveAbayas');
        let data = await response.json();
  

        console.log("Response data:", data);
  
        let container = document.getElementById('abayas-products-container');
        container.innerHTML = ''; 
  

        if (data && data.products && data.products.length > 0) {
            
            // عرض المنتجات
            data.products.forEach(product => {
                const currentPrice = product.priceWithDiscount ? 
                (product.price - (product.price * (product.priceWithDiscount / 100))).toFixed(2) : 
                product.price.toFixed(2);
            const oldPrice = product.priceWithDiscount ? product.price.toFixed(2) : null; // إذا لم يكن هناك خصم، اجعل السعر القديم null
                // تحديث محتويات الصفحة باستخدام innerHTML
                container.innerHTML += `
                <div class="properties pb-30">
                    <div class="properties-card">
                        <div class="properties-img">
                            <a href="productdetalis1">
                                <img src="../../../../Backend/Masterpiece/Masterpiece/Uploads/${product.image}" alt="${product.name}">
                            </a>




                            <div class="socal_icon">
                                <a href="cart.html" onclick="addToCart(${product.productId}, '${product.name}', ${currentPrice}, '${product.image}')"><i class="ti-shopping-cart"></i></a>
                                <a href="#"><i class="ti-heart"></i></a>
                                <a href="#" onClick="storeProductId(${product.productId})"><i class="ti-zoom-in"></i></a>
                            </div>
                        </div>
                        <div class="properties-caption properties-caption2">
                            <h3><a href="productdetalis1.html">${product.name}</a></h3>
                            <div class="properties-footer">
                                <div class="price_box">
                        <span id="currentPrice" class="current_price">$${currentPrice}</span>
                        ${oldPrice ? `<span id="oldPrice" class="old_price" style="text-decoration: line-through;">$${oldPrice}</span>` : ''}
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
        } else {
            console.error('لا توجد منتجات متاحة حالياً.');
        }
    } catch (error) {
        console.error('Error fetching abayas:', error);
    }
  }


loadTopFiveAbayas();



// دالة لتخزين productId في localStorage وإعادة التوجيه إلى صفحة التفاصيل
function storeProductId(productId) {
    localStorage.setItem('productId', productId); // تخزين productId في localStorage
    window.location.href = 'productdetalis1.html'; // إعادة التوجيه إلى صفحة التفاصيل
}
//////////////////////////////////
//كود اضافة لسلة   

var UserId = localStorage.getItem("UserId");
debugger
async function addToCart(productId, name, price, image) {
debugger
    if (UserId != null) {
        debugger
        event.preventDefault();

        var url = `https://localhost:44332/api/Cart/AddCartItem/${UserId}`;
    
        var data = {
            ProductId: productId,
            Quantity: 1,
           
        };
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("تمت إضافة المنتج إلى السلة بنجاح!");

debugger
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

            // Check if the product is already in the cart
            let existingItem = cartItems.find((item) => item.product_id === productId);
    
            if (existingItem) {
                // If the product is already in the cart, update the quantity
                existingItem.quantity = parseInt(existingItem.quantity) + 1; // Increment quantity by 1
            } else {
                // If it's a new product, add it to the cart array
                cartItems.push(cartItem);
            }
    
            // Save the updated cart back to localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            // Redirect to the cart page
            window.location.href = "cart.html"; // استبدل هذا بالرابط الصحيح
        } else {
            let error = await response.text();
            console.error("Error:", error);
        }
    } else {
        debugger
        const cartItem = {
            product_id: productId,
            quantity: 1,
            name: name,
            price: price,
            image: image,
        };
debugger
        // Check if there is already a cart in localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Check if the product is already in the cart
        let existingItem = cartItems.find((item) => item.product_id === productId);

        if (existingItem) {
            // If the product is already in the cart, update the quantity
            existingItem.quantity = parseInt(existingItem.quantity) + 1; // Increment quantity by 1
        } else {
            // If it's a new product, add it to the cart array
            cartItems.push(cartItem);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // تأكد من عرض تفاصيل المنتج
       alert(`Product added successfully to the cart!\nName: ${name}\nPrice: $${price}\nQuantity: ${cartItem.quantity}`);
        
        // Redirect to the cart page
        window.location.href = "cart.html"; // استبدل هذا بالرابط الصحيح
    }
}
/////////////////////////////////
async function loadSubcategories(categoryId) {
    try {
        const response = await fetch(`https://localhost:44332/api/SubCategory/GetSUbCategoryBYCtegoryID/${categoryId}`);
        const subcategories = await response.json();

        // تحديد عدد الفئات المراد عرضها (مثلاً 4)
        const maxItems = 4;
        const subcategoryContainer = document.getElementById('dynamicSubcategories');
        subcategoryContainer.innerHTML = ''; // تفريغ المحتوى السابق

        // استخدام slice لتحديد أول أربع فئات فقط
        subcategories.slice(0, maxItems).forEach(subcategory => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="#" data-id="${subcategory.subcategoryId}">${subcategory.subcategoryName}</a>`;
            subcategoryContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching subcategories:', error);
    }
}

// استدعاء الدالة مع معرف الفئة المرغوبة (categoryId) لجلب الفئات الفرعية وعرضها في الفوتر
loadSubcategories(6); // استبدل "1" بمعرف الفئة المطلوب


async function Subcategories(categoryId) {
    try {
        const response = await fetch(`https://localhost:44332/api/SubCategory/GetSUbCategoryBYCtegoryID/${categoryId}`);
        const subcategories = await response.json();

        // تحديد عدد الفئات المراد عرضها (مثلاً 4)
        const maxItems = 4;
        const subcategoryContainer = document.getElementById('Subcategories2');
        subcategoryContainer.innerHTML = ''; // تفريغ المحتوى السابق

        // استخدام slice لتحديد أول أربع فئات فقط
        subcategories.slice(0, maxItems).forEach(subcategory => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="#" data-id="${subcategory.subcategoryId}">${subcategory.subcategoryName}</a>`;
            subcategoryContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching subcategories:', error);
    }
}

// استدعاء الدالة مع معرف الفئة المرغوبة (categoryId) لجلب الفئات الفرعية وعرضها في الفوتر
Subcategories(2); // استبدل "1" بمعرف الفئة المطلوب
