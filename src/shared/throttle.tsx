export const throttle = (fn: Function, time: number) => {
  let timer: number | undefined = undefined
  return (...args: any[]) => {
    if (timer) return;    // timer存在：说明之前调用过，且还在cd冷却

    else {                // timer不存在：说明之前没有调用，那么正常执行
      fn(...args)
      timer = window.setTimeout(() => {    // 开始进入冷却，冷却完毕才重置timer
        timer = undefined
      }, time)
    }
  }
}