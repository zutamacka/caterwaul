<template>
  <div>
    <div class=" q-py-none q-px-md row items-end q-col-gutter-sm">
      <div class="col">
        <q-input
          filled
          v-model="newCaterWaulContent"
          class="caterwaul-button"
          label-slot
          maxlength="269"
          bottom-slots
          autogrow
          counter
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://i.imgur.com/PqSNKmX.png" />
            </q-avatar>
          </template>

          <template v-slot:label>
            <div class="row items-center all-pointer-events text-secondary">
              <q-icon
                class="q-mr-xs"
                color="secondary"
                size="24px"
                name="fas fa-cat"
              />
              What pussed you off?
              <q-tooltip
                content-class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Give us your hissyful thoughts</q-tooltip
              >
            </div>
          </template>

          <template v-slot:hint>
            Hiss at someone!
          </template>
        </q-input>
      </div>
      <div class="col col-shrink ">
        <q-btn
          @click="addNewCaterwaul"
          :disable="!newCaterWaulContent"
          class="q-mb-md"
          push
          round
          color="primary"
          icon="fas fa-paw"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CreateCaterwaul',
  data() {
    return {
      newCaterWaulContent: ''
    }
  },
  methods: {
    ...mapActions('store', ['createPost']),
    addNewCaterwaul() {
      let newCwaul = {
        content: this.newCaterWaulContent,
        date: Date.now(),
        userId: '',
        likes: 0
      }
      this.createPost(newCwaul)
      this.newCaterWaulContent = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.caterwaul-button
  font-size: 21px
  textarea
    overflow-y: hidden
    line-height: 150%
.caterwaul-main-sep
  border-top: 2px solid
  border-bottom: 2px solid
  border-color: $grey-3
  margin-top: 2px
.caterwaul_content
  white-space: pre-line
.caterwaul-icons
  margin-left: -5px
</style>
