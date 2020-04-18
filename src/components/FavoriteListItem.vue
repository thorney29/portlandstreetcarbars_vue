<template>
    <div v-if="favorite && user" class="card favorite">
      <template v-if="!editing">
        <div>
       <!-- favorite display and information --> 
          <div @click.prevent="editing = true" class="favorite__heart" v-bind:class="{'favorite__heart__selected': this.favorite.favoriteValue, 'is-disabled': !this.favorite.favoriteValue}"  title="Add/Remove to favorites"> 
              <i class="fas fa-heart"></i>  <!-- {{favorite.favoriteValue}}<br> -->
           </div>
           <div @click.prevent="editing = true" class="favorite__star" v-bind:class="{'favorite__star__selected': this.favorite.toGoValue, 'is-disabled': !this.favorite.toGoValue}"  title="Add/Remove 'To Go' list">
              <i class="fas fa-star"></i> 
          </div><br>
         <div class="favorite-content">
          <div v-if="this.favorite.barNotes">
            <p class='notes-title'>My Notes:</p> 
            <p class="notes">{{this.favorite.barNotes}}</p>       
          </div> 
          <div v-else><em>Click the note icon below to add a notes about this bar.</em></div>
        </div>
        <a @click.prevent="editing = true" href="#" style="margin-left: auto;" class="link-unstyled" title="Make a change"><i class="fas fa-pencil">edit</i></a>
        </div>
      </template>
      <div style="margin-top: 2%;" v-else> 
          <FavoriteEditor
          :favorite="favorite"
          @save="editing = false"
          @cancel="editing = false"
          />
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
  .card.favorite {
    padding-top: 20px;
  }
  .notes-title {
    font-family: 'Open Sans', sans-serif;
    text-align: center;
  }
  .notes { 
    font-family: 'Over the Rainbow', cursive;
    font-size: 24px;
    font-family: 'Bungee Inline', cursive;
    font-family: 'Gochi Hand', cursive;
    padding: 10px;
  }

  .favorite__heart,
  .favorite__star {
      display: inline-block;
      position: relative;
      padding: 3px;
      vertical-align: middle;
      text-align: center;
      font-size: 20px;
      color: #ABABAB;
      cursor: pointer;
      -webkit-transition: color .2s ease-out;
      transition: color .2s ease-out;
  }

  .favorite__checkbox {
     opacity: 0;
      height: 20px;
      border: blue 1px solid;
      width: 30px;
      position: absolute;
      left: 4px;
      top: 0px;
      height: 30px;
  }
  .favorite__heart__selected {
      color: red;
  }
  .favorite__star__selected {
      color: gold;
  }
  svg.svg-inline--fa.fa-edit.fa-w-18{
      display: inline-block;
      font-size: 37px;
  }
  .favorite-content {
    /*border: 1px dashed #ccc;*/
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    margin: 3% auto;
    padding: 20px 0px;
  }
</style>
