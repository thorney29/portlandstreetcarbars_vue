<template>
  <div v-if="favorite && user" class="favorite" style="border: 1px solid red;padding:20px;margin: 1%;">
      <template v-if="!editing">
        {{favorite.favoriteValue}}<br>
        <!--  <i class="fas fa-heart"
        v-bind:class="{'favorite__heart__selected': favorite.favoriteValue, 'is-disabled': !favorite.favoriteValue}"></i> -->
        <!-- <p class="desktop-only text-small">{{userFavoritesCount}} favorites</p> -->
        <div class="favorite-content" style="border: 1px solid yellow;padding:20px;margin: 1%;">
              <div>
               Secondary info: {{favorite.text}}
              </div>
            <a @click.prevent="editing = true" href="#" style="margin-left: auto;" class="link-unstyled" title="Make a change"><i class="fas fa-pencil">edit</i></a>
          </div>
      </template>
      <div v-else style="border: 1px solid green;padding:20px;margin: 1%;">
        <FavoriteEditor
          :favorite="favorite"
          @save="editing = false"
          @cancel="editing = false"
        />
      </div>
    </div>
  </div> 
</div>
</template>

<script>
    import FavoriteEditor from './FavoriteEditor'

    export default {
      props: {
        favorite: {
          required: true,
          type: Object
        }
      },
      data () {
        return {
          editing: false
        }
      },
      components: {
        FavoriteEditor
      },

      computed: {
        user () {
          return this.$store.state.users.items[this.favorite.userId]
        },

        userFavoritesCount () {
          return this.$store.getters['users/userFavoritesCount'](this.favorite.userId)
        },

        userBarsCount () {
          return this.$store.getters['users/userBarsCount'](this.favorite.userId)
        }
      }
    }
</script>

<style scoped>

</style>
