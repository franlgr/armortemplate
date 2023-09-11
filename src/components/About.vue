<template>
  <div>
    <div v-for="sorteo in sorteos" :key="sorteo._id">
      <figure class="px-8 pt-0">
        <img
          src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/448/812/products/fernet-promo-11-6edbfa46bdcce23a1e16578916553274-640-0.webp"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>

      <div class="card-body items-center text-center p-4">
        <div class="p-2">
          <div class="rating">
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              class="mask mask-star-2 bg-orange-400"
              checked
            />
          </div>
          <div class="p-2">
            <h2 class="card-title text-center">{{ sorteo.titulo }}</h2>
            <p>{{ sorteo.descripcion }}</p>
          </div>
        </div>
        <!-- <div class="card-actions">
                               </div>
                                    <button class="btn btn-primary">Participar Ahora</button>
                                </div> -->
        <div class="stats bg-primary text-primary-content">
          <div class="stat mx-0 p-8">
            <div class="stat-title uppercase">Precio Rifa</div>
            <div class="stat-value">ARS ${{ sorteo.precio }}</div>
            <div class="stat-title">FECHA</div>
            <div class="stat-value text-sm">{{ sorteo.fecha_del_sorteo }}</div>
            <div class="stat-actions">
              <!-- <button class="btn btn-sm btn-success" @click="buy()">Participar</button> -->
              <!-- <router-link :to="{ name: 'Comprar' }" class="btn btn-sm btn-success">Comprar Rifa</router-link> -->
              <router-link
                :to="{ name: 'Single', params: { id: sorteo._id } }"
                class="btn btn-sm btn-success"
                >Comprar Rifa</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
