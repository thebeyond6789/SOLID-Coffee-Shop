// https://order.phuclong.com.vn/thuc-uong--c15
const productHTMLList = document.querySelectorAll(".product-card");
let productList = [];
productHTMLList.forEach((item) => {
  const product = {
    name: item.querySelector(`[class^="product-card__Title"]`).innerText,
    price: Number(
      item
        .querySelector(`[class^="product-card__Price"]`)
        .innerText.replace(/[^0-9]/gi, "")
    ),
    image: item
      .querySelector(`img[class^="product-card__Image"]`)
      .src.split("/")
      .pop(),
    categoryId: "tea",
  };
  productList.push(product);
});
console.log(productList);
