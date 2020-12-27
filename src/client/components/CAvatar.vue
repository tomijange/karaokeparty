<template>
  <div class="avatar pa-4">
    <ul class="avatar-heads">
      <li v-for="head in heads" :key="head" :id="head" @click="onEmojiClick1(head)"> <span>{{ head }}</span> </li>
    </ul>
    <ul class="avatar-bodies">
      <li v-for="body in bodies" :key="body" :id="body" @click="onEmojiClick2(body)"> <span> {{ body }}</span> </li>
    </ul>
  </div>
</template>

<script>

import {Component, Vue} from "vue-property-decorator";

@Component({
  props: {
    avatarHead: {
      type: String,
      default: '🙂',
    }
  }
})

export default class CAvatar extends Vue {
  heads = ['🙂', '😉', '😲', '😄', '🥴'];
  bodies = ['👔', '🩱', '🥼', '👗', '👕'];

  onEmojiClick1(item) {
    const parent = document.getElementById(item).parentElement;
    for (let i = 0; i < parent.children.length; i++) {
      parent.children[i].style.backgroundColor = 'white';
    }
    if (document.getElementsByClassName("finalhead")[0]) {
      document.getElementsByClassName("finalhead")[0].classList.remove("finalhead");
    }
    document.getElementById(item).style.backgroundColor = 'dodgerblue';
    document.getElementById(item).classList.add("finalhead");

  }
  onEmojiClick2(item) {
    const parent = document.getElementById(item).parentElement;
    for (let i = 0; i < parent.children.length; i++) {
      parent.children[i].style.backgroundColor = 'white';
    }
    if (document.getElementsByClassName("finalbody")[0]) {
      document.getElementsByClassName("finalbody")[0].classList.remove("finalbody");
    }
    document.getElementById(item).style.backgroundColor = 'dodgerblue';
    document.getElementById(item).classList.add("finalbody");
  }
}

</script>

<style lang="scss">

.avatar {
  box-shadow: 0 0 10px #919191;
}
.avatar ul {
  padding: 0;
  margin: 0;
}
.avatar li {
  cursor: pointer;
  margin: 2px;
  list-style: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0 2px #919191;
  background-color: white;
  transition: background-color 0.2s;
}
.avatar li span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.4rem;
  background-color: inherit;
  user-select: none;
}

</style>