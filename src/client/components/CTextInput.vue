<template>
  <input v-bind="$attrs" class="input" type="text" @keydown="e => $emit('input', e.target.value)"/>
</template>


<style scoped lang="scss">

.input {


}


</style>
