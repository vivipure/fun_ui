export const debounce = (fn: (...args: any[]) => any, time: number, immediate: boolean) => {
    let timeout: number | null
    return (...args: any[]) => {
        if (timeout) clearTimeout(timeout)
        var context = this;
        if (immediate) {
            let canCall = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, time);
            if (canCall) fn.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                fn.apply(context, args)
            }, time);
        }
    }
}