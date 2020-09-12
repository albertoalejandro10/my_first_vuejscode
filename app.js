//  «Pascal - Case» del JS lo parsea a «Kebab-case» dentro del HTML
Vue.component('CoinDetail' , {
    props: ['coin'],

    data: function(){
        return{
            showPrices: false,
            value: 0,
        }
    },

    computed: {
        title() {
            return `${this.coin.name} - ${this.coin.symbol}`
        },
        convertedValue(){
            if(!this.value){
                return 0
            }

            return this.value/this.coin.priceOnly
        }
    },
    
    created(){
        console.log('Created from CoinDetails...')
    },

    mounted(){
        console.log('Mounted from CoinDetails...')
    },

    methods:{
        toggleShowPrices(){
            this.showPrices = !this.showPrices

            this.$emit('change-color',
            this.showPrices ? 'FF96C8' : '3D3D3D')
        }
    },

    template: `

    <div>
        <img v-on:mouseover="toggleShowPrices" v-on:mouseout="toggleShowPrices" v-bind:src="coin.img" v-bind:alt="coin.name">

        <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">

            {{ title }}
            <span v-if="coin.changePercent > 0">😁</span>
            <span v-else-if="coin.changePercent < 0">😂</span>
            <span v-else>😎</span>
            <span v-on:click="toggleShowPrices">
                {{ showPrices ? '😍' : '😖'}}
            </span>

        </h1>
        
        <input type="number" v-model="value">
        <span> {{ convertedValue }}</span>

        <slot name="text"></slot>

        <slot name="link"></slot>

        <ul v-show=showPrices>
            <li
            class="uppercase" 
            v-bind:class="{ orange: price.value === coin.priceOnly, red: price.value < coin.priceOnly, green: price.value > coin.priceOnly }"
            v-for="(price, index) in coin.pricesWithDays"
            v-bind:key="price.day">
                {{index + 1 }} -> {{ price.day }} - {{ price.value }}
            </li>
        </ul>
    </div>

    `
})


// // Definir un nuevo componente llamado button-counter
// Vue.component('button-counter', {
//     data: function () {
//       return {
//         count: 0
//       }
//     },
//     template: '<button v-on:click="count++">Me ha pulsado {{ count }} veces.</button>'
// })

new Vue({
    el: '#app',
    data(){
        return {
            btc:{

                name: 'Bitcoin',
                symbol: 'BTC',
                img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                changePercent: 0,
                priceOnly: 8400,
                pricesWithDays: [

                    {day: 'Lunes', value: 8400},
                    {day: 'Martes', value: 7900},
                    {day: 'Miercoles', value: 8200},
                    {day: 'Jueves', value: 9000},
                    {day: 'Viernes', value: 9400},
                    {day: 'Sabado', value: 10000},
                    {day: 'Domingo', value: 10200},

                ],

            },
            // prices: [8400, 7900, 8200, 9000, 9400, 10000, 10200],

            color: 'f4f4f4',

        }
    },

    created(){
        console.log('Created...')
    },

    mounted(){
        console.log('Mounted...')
    },

    // watch: {
    //     showPrices(newValue, oldValue){
    //         console.log(newValue, oldValue)
    //     }
    // },

    methods: {
        updateColor(color) {

            this.color = color || this.color.split('').reverse('').join('')

        }
    },
})

 Vue.config.devtools = true;