<template>
    <div>
        
        <!-- component -->
<div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
  <div class="container max-w-screen-lg mx-auto">
    <div>
      <h2 class="font-semibold text-xl text-gray-600">Shipping Info</h2>
      <p class="text-gray-500 mb-6">Complete shipping info</p>

      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div class="text-gray-600">
            <p class="font-medium text-lg">Personal Details</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label for="full_name">Full Name</label>
                <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
              </div>

              <div class="md:col-span-5">
                <label for="email">Email Address</label>
                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>

              <div class="md:col-span-3">
                <label for="address">Address / Street</label>
                <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>

              <div class="md:col-span-2">
                <label for="city">City</label>
                <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>

              <div class="md:col-span-2">
                <label for="country">Country / region</label>
                <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input name="country" id="country" placeholder="Country" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                </div>
              </div>

              <div class="md:col-span-2">
                <label for="state">State / province</label>
                <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input name="state" id="state" placeholder="State" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                </div>
              </div>

              <div class="md:col-span-1">
                <label for="zipcode">Zipcode</label>
                <input type="text" name="zipcode" id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
              </div>

              <div class="md:col-span-5">
                <div class="inline-flex items-center">
                  <input type="checkbox" name="billing_same" id="billing_same" class="form-checkbox" />
                  <label for="billing_same" class="ml-2">My billing address is different than above.</label>
                </div>
              </div>
              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                    <router-link
                    to="/products/checkout"
                    class="w-full p-4 float-left cursor-pointer hover:bg-[#2c7b60] bg-gray-300 rounded hover:text-white text-black grid grid-cols-2 items-center"
                  >
                    <p class="col-span-1">Checkout</p>
                    <i 
                      class="fa-solid fa-cart-shopping col-span-1 justify-self-end"
                    ></i>
                  </router-link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <a href="https://www.buymeacoffee.com/dgauderman" target="_blank" class="md:absolute bottom-0 right-0 p-4 float-right">
      <img src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg" alt="Buy Me A Coffee" class="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white">
    </a> -->
  </div>
</div>
    </div>
</template>