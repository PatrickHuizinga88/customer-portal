export default function(price: number) {
    return `€${price.toFixed(2).replace('.', ',')}`
}