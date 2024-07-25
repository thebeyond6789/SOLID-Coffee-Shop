export default function ProductAdd() {
  return (
    <>
      <div class="d-flex justify-content-between">
        <h3 class="mb-4">Add Product</h3>
        <div>
          <a href="#" class="btn btn-outline-secondary rounded-0">
            <i class="far fa-long-arrow-left"></i> Back
          </a>
        </div>
      </div>
      <form class="row" action="" method="POST" enctype="multipart/form-data">
        <div class="col-md-8 mb-4">
          <div class="card rounded-0 border-0 shadow-sm mb-4">
            <div class="card-body">
              <h6 class="pb-3 border-bottom">Basic Info</h6>
              <div class="mb-3">
                <label for="name" class="form-label">
                  Name *
                </label>
                <input
                  type="email"
                  class="form-control rounded-0"
                  id="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  Description
                </label>
                <textarea
                  class="form-control rounded-0"
                  id="description"
                  rows="6"
                ></textarea>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="instock" class="form-label">
                    Instock *
                  </label>
                  <input
                    type="number"
                    class="form-control rounded-0"
                    id="instock"
                    min="0"
                    required
                  />
                </div>
                <div class="col mb-3">
                  <label for="category" class="form-label">
                    Category *
                  </label>
                  <div class="input-group">
                    <select
                      class="form-select rounded-0"
                      id="category"
                      required
                    >
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <button
                      type="button"
                      class="btn btn-outline-primary rounded-0"
                    >
                      <i class="fal fa-boxes"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card rounded-0 border-0 shadow-sm">
            <div class="card-body">
              <h6 class="pb-3 border-bottom">Price</h6>
              <div class="row">
                <div class="col mb-3">
                  <label for="price" class="form-label">
                    Price *
                  </label>
                  <input
                    type="number"
                    class="form-control rounded-0"
                    id="price"
                    min="0"
                    required
                  />
                </div>
                <div class="col mb-3">
                  <label for="sale_price" class="form-label">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    class="form-control rounded-0"
                    id="sale_price"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card rounded-0 border-0 shadow-sm">
            <div class="card-body">
              <h6 class="pb-3 border-bottom">Image</h6>
              <div class="mb-3">
                <label for="image" class="form-label">
                  Product Image *
                </label>
                <input class="form-control rounded-0" type="file" id="image" />
                <div class="bg-secondary-subtle mb-3 p-2 text-center">
                  <img src="assets/img/products/iphone.webp" class="w-50" />
                </div>
              </div>
              <div class="mb-3">
                <label for="images" class="form-label">
                  More Product Image
                </label>
                <input
                  class="form-control rounded-0"
                  type="file"
                  id="images"
                  multiple
                />
                <div class="bg-secondary-subtle mb-3 p-2 text-center d-flex">
                  <img src="assets/img/products/iphone.webp" class="w-25" />
                  <img src="assets/img/products/iphone.webp" class="w-25" />
                  <img src="assets/img/products/iphone.webp" class="w-25" />
                  <img src="assets/img/products/iphone.webp" class="w-25" />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-lg rounded-0 mt-4 w-100"
          >
            Create Product
          </button>
        </div>
      </form>
    </>
  );
}
