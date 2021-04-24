<template>
    <h1 class="mb-6 text-3xl font-extrabold">Home</h1>
    <div>
        <input
            type="color"
            name="color"
            value="#e66465"
            @change="colorPicked"
        />
        <label for="color" class="ml-2">Color</label>
    </div>
    <div class="mt-2 text-2xl">{{ colorLabel }}</div>
</template>

<script setup>
import * as useMl5 from '../useMl5'
import { convertToRgb } from '../convertToRgb'
import data from '../data.json'
import { computed } from 'vue'

// initialize
useMl5.init(data)

// color picker
function colorPicked(event) {
    // set color as input
    const hexCode = event.target.value.substring(1, 7)
    // convert to rgb
    const input = convertToRgb(hexCode)
    console.log(input)
    useMl5.classify(input)
}

const colorLabel = computed(() => {
    return useMl5.colorLabel.value
})
</script>
