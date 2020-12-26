<template>
  <div class="home">
    <p>
      Hallo patty
    </p>
    <c-text-input id="textInput1" label-text="Username" class="username-input"></c-text-input>

    <p>{{ text }}</p>

    <c-button>Test</c-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CButton from "@/client/components/CButton.vue";
import CTextInput from "@/client/components/CTextInput.vue";

@Component({
  components: { CTextInput, CButton },
})
export default class Home extends Vue {

  text = 'Hallo wie gehts';


  onTextChange(e: any) {
    console.log(e);
    this.text = e.target?.value;
  }
}
</script>

<style lang="scss">
.home {
  background: radial-gradient(#ffffff, #eeeeee);
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
}

.username-input label {
  background-color: #3a9f5c;
  color: #fff;
}

</style>
