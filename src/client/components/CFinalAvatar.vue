<template>
  <div class="finalavatar pa-4">
    <ul class="finalavatar">
      <li>
        <span id="finalhead"></span>
        <span id="finalbody"></span>
      </li>
    </ul>
  </div>
</template>

<script>

</script>

<style lang="scss">

.finalavatar {
  box-shadow: 0 0 10px #919191;
}
.finalavatar ul {
  padding: 0;
  margin: 0;
}
.finalavatar li {
  cursor: pointer;
  margin: 2px;
  list-style: none;
  width: 50px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0 2px #919191;
  background-color: white;
  transition: background-color 0.2s;
}
.finalavatar li span {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transform: scale(1.15);
}

</style>