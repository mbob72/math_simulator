export function hash( arg ) {
    if(Array.isArray(arg)) {
        return `${arg[0]}${arg[1]}${arg[3]}`
    }
    const { min, max, action } = arg
    return `${min}${max}${action}`
}