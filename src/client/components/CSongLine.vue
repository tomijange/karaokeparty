<template>
  <div class="line">
    <pre>
      {{line}}
    </pre>
  </div>  
</template>

<script lang="ts">
import { UltraStarLine } from "@/shared/ultrastar-parser/types";
import {Component, Prop, Vue} from "vue-property-decorator";


@Component({})
export default class CSongLine extends Vue {

  @Prop()
  readonly line!: UltraStarLine;

}
</script>

<style>

.line {
  border-bottom: 1px solid black;
}

</style>
