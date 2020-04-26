<template>
  <div class="card" :class="beer.valid ? 'success' : 'danger'">
    <div class="card-title">
      {{ beer.name }} ({{beer.refrigeration.min}}°C - {{beer.refrigeration.max}}°C)
    </div>
    <div class="card-information">
      {{ beer.currentTemperature }}°C
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeerTemperatureStatus',
  props: ['beer']
}
</script>

<style>
.card {
  font-family: 'Roboto', sans-serif;
  display: flex;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 5px 7px 5px 0 #a1aab7;
  border-radius: 10px 10px 10px 10px;
  border: 0px solid #000000;
  font-weight: 500;
  justify-content: space-between;
}

.success {
  background-color: #4B8560;
  color: #EEF3FA;
}

.danger {
  background-color: #EE575D;
  color: #EEF3FA;
}
</style>
