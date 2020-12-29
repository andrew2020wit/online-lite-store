<template>
  <div>
    <h1>HomePage: shopwindow</h1>
    <pre>{{ goods }}</pre>
  </div>
</template>

<script>
export default {
  components: {},
  async asyncData({ $content }) {
    const goods = await $content('goods')
      .only(['goodsId', 'goodsName', 'goodsPrice', 'slug'])
      .fetch()
    console.log('goods', goods)
    return { goods }
  },
}
</script>
