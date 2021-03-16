<template>
  <q-img
    src="https://i1.wp.com/freepngimages.com/wp-content/uploads/2016/12/ginger-cat-lazing.png?fit=616%2C650"
    spinner-color="white"
    style="height: 140px; max-width: 150px"
  >
    <template v-slot:error>
      <div class="absolute-full flex flex-center bg-negative text-white">
        Yout Cat is Missing.
      </div>
    </template>
  </q-img>
</template>
