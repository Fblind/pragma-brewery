<template>
  <div class="container">
    <header class="header">
      <div>Pragma Brewery</div>
      <div @click="fetchBeers" class="header-icon"><span class="material-icons big">refresh</span></div>
    </header>
    <main class="main">
      <div v-if="refrigerationFailure" class="red"><span class="material-icons">error_outline</span> Refrigeration Failure</div>
      <beer-temperature-status v-for="beer of beersToShow" :key="beer.type" :beer='beer'/>
    </main>
  </div>
</template>

<script>
import BeerTemperatureStatus from '../components/beer-temperature-status'
import axios from 'axios'
function sortByValid(beer, otherBeer) {
  if (beer.valid && !otherBeer.valid) {
    return 1
  }
  if (!beer.valid && otherBeer.valid) {
    return -1
  }
  return 0
}

export default {
  name: 'app',
  components: {BeerTemperatureStatus},
  mounted() {
    this.fetchBeers()
    window.setInterval(() => {
      this.fetchBeers()
    }, 60000)
  },
  data () {
    return {
      beers: []
    }
  },
  computed: {
    beersToShow() {
      return this.beers.sort(sortByValid)
    },
    refrigerationFailure() {
      return this.beers.some(beer => !beer.valid)
    }
  },
  methods: {
    fetchBeers() {
      axios.get('/beers/refrigeration-status')
        .then(({data}) => {
          this.beers = data.data
        })
    },
  }
}
</script>

<style>
.container {
  font-family: 'Roboto', sans-serif;
  background: #F2F2F6;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0px 3px 5px 0px rgba(161,170,183,1);
  margin-bottom: 1rem;
  align-items: center;
  font-size: 1.5rem;
  color: #030304;
}
.red {
  display: flex;
  color: #EE575D;
  align-items: center;
  margin-bottom: 1rem;
}
.main {
  margin-left: 1rem;
  margin-right: 1rem;
}
.big {
  font-size: 32px;
}
.header-icon {
  display: flex;
  cursor: pointer;
}
</style>
