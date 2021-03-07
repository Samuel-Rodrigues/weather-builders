export function fToC(fahrenheit?: number) {
    if (!fahrenheit)
        return

    var fTemp = fahrenheit;
    var fToCel = (fTemp - 32) * 5 / 9;
    return Number(fToCel).toFixed(2)//fTemp + '\xB0F is ' + fToCel + '\xB0C.';
}

export function kToC(kelvin: number) {
    if (!kelvin)
        return 0

    const res = kelvin - 273.15
    return res.toFixed(0)
}