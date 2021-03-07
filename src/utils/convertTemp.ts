export function kToC(kelvin: number) {
    if (!kelvin)
        return 0

    const res = kelvin - 273.15
    return res.toFixed(0)
}