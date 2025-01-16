export default function(price: number | string) {
    if (typeof price === 'string') {
        price = parseFloat(price)
    }

    return `€${price.toFixed(2).replace('.', ',')}`
}