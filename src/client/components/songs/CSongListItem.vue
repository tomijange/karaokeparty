<template>
  <li :class="{
      'song-list-item': true, 
      'ma-2': true,
      'selected': selected,
    }"
    v-on="$listeners"
  >
    <img :src="thumbnail" class="image" />
    <div class="body">
      <h5>
        {{ file.header.title }} - {{ file.header.artist }}
      </h5>
    </div>
  </li>
</template>

<script lang="ts">

import { User } from "@/shared/game/types";
import { UltraStarFile } from "@/shared/ultrastar-parser/types";
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class CSongListItem extends Vue {

  @Prop()
  readonly file!: UltraStarFile;

  @Prop()
  readonly selected!: boolean;

  get thumbnail() {
    const id = (this as any).$youtube.getIdFromUrl(this.file.header.youtube);
    if (id) {
      return `//img.youtube.com/vi/${id}/mqdefault.jpg`;
    }
    return null;
  }

}

</script>

<style scoped lang="scss">

.song-list-item {
  --color: rgb(70, 70, 70);

  display: flex;
  background: #f5f5f5;
  transition-duration: .2s;
  transition-property: box-shadow, background;

  &:hover {
    background: #e4e4e4;
  }

  &:active, &.selected {
    background: #c3c3c3;
    box-shadow: 0 0 5px 1px #c3c3c3;
  }

  .image {
    height: 64px;
  }
  .body {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 8px 8px;
  }
}


</style>
