<template>
  <form @submit.prevent="save">
      <div class="form-group heart">
        <label
          class="favorite__heart" 
          v-bind:class="{'favorite__heart__selected': favoriteValue, 'is-disabled': !favoriteValue}"
          >
            <i class="fas fa-heart"></i>
            <input
            title="Add to/Remove from your Favorites List"
            v-on:click="changeFavoriteValue"
            class="favorite__checkbox"
            type="checkbox"
            v-model="favoriteValue">
        </label>  
      </div>
       <div class="form-group star">
          <label
            class="favorite__star" 
            v-bind:class="{'favorite__star__selected': toGoValue, 'is-disabled': !toGoValue}"
            >
              <i class="fas fa-star"></i>
              <input
              title="Add to/Remove from your Go To List"
              v-on:click="changeToGoValue"
              class="star__checkbox"
              type="checkbox"
              v-model="toGoValue">
          </label>
       </div>
      <div class="form-group note">
        <label><i class="fas fa-marker"></i> Add a note for later    
        <textarea
          name=""
          id=""
          class="form-input"
          v-model="barNotes"
          placeholder="Add notes about your visit: ambiance, drinks, service" 
        ></textarea></label>
      </div>
      <div class="form-actions">
        <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
        <button class="btn-maroon">{{isUpdate ? 'Update' : 'Save'}}</button>
      </div>
  </form>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
      props: {
        barId: {
          required: false
        },
        userId: {
          required: false
        },
        favorite: {
          type: Object
        }
        // favorite: {
        //   type: Object,
        //   validator: obj => {
        //     const keyIsValid = typeof obj['.key'] === 'string'
        //     const textIsValid = typeof obj.text === 'string'
        //     const valid = keyIsValid && textIsValid
        //     if (!textIsValid) {
        //       console.error('😳 The favorite prop object must include a `text` attribute.')
        //     }
        //     if (!keyIsValid) {
        //       console.error('😳 The favorite prop object must include a `.key` attribute.')
        //     }
        //     return valid
        //   }
        // }
      },

      data () {
        return {
          barNotes: this.favorite ? this.favorite.barNotes : '',
          favoriteValue: this.favorite ? this.favorite.favoriteValue : false,
          toGoValue: this.favorite ? this.favorite.toGoValue : false,
          editing: false
        }
      },

      computed: {
        isUpdate () {
          return !!this.favorite
        }
      },

      methods: {
        ...mapActions('favorites', ['createFavorite', 'updateFavorite']),

        changeFavoriteValue: function () {
          this.favoriteValue = !this.favoriteValue
        },
        changeToGoValue: function () {
          this.toGoValue = !this.toGoValue
        },
        save () {
          this.persist()
            .then(favorite => {
              this.$emit('save', {favorite})
            })
        },

        cancel () {
          this.$emit('cancel')
        },

        create (barNotes, favoriteValue, toGoValue, barId) {
          const favorite = {
            barNotes: this.barNotes,
            favoriteValue: this.favoriteValue,
            toGoValue: this.toGoValue,
            barId: this.barId
          }
          this.barNotes = ''
          return this.createFavorite(favorite)
        },

        update () {
          const payload = {
            id: this.favorite['.key'],
            barNotes: this.barNotes,
            favoriteValue: this.favoriteValue,
            toGoValue: this.toGoValue,
            barId: this.barId
          }
          return this.updateFavorite(payload)
        },

        persist () {
          return this.isUpdate ? this.update() : this.create()
        }
      }
    }
</script>

<style scoped>

.form-group {
  margin: 0 auto;
}

.form-group.heart,
.form-group.star {
  display: inline;
} 
.form-group.note {
  margin-top: 2%;
}
.favorite__heart,
.favorite__star {
    position: relative;
    padding: 3px;
    vertical-align: middle;
 /*   line-height: 1;*/
    font-size: 20px;
    color: #ABABAB;
    cursor: pointer;
    -webkit-transition: color .2s ease-out;
    transition: color .2s ease-out;
}
svg.svg-inline--fa.fa-star.fa-w-18 {
  font-size: 20px;
}

 .favorite__checkbox,
 .star__checkbox {
    opacity: 0;
    height: 30px;
    width: 30px;
    position: absolute;
    cursor: pointer
 }

.favorite__checkbox {
    left: 4px;
    top: 0px;
}
.star__checkbox {
    left: 5px;
    top: 2px;
}
.favorite__heart__selected {
    color: red;
}
.favorite__star__selected {
    color: gold;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ccc;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color:#ccc;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #ccc;
}
</style>