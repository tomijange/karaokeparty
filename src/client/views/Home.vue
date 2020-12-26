<template>
  <div class="home">
    <p>
      Hallo patty
    </p>
      <c-text-input ></c-text-input>

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

<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .home {
    background-color: #f1f1f1;
    padding: 20px;
  }
</style>
