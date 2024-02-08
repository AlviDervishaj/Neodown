/**
 *
 * Delay execution of a function by x ms
 * @param {(...args: T) => void} func Function that will be delayed
 * @param {number} delay Ammount of milliseconds 
* */
export const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
  let timerId: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), delay);
  };
};


/**
 *
 * Limit the rate of api calls to once every x ms
 * @param {(...args: T) => void} func Function to execute
 * @param {number} limit Ammount of milliseconds 
* */
export const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
  let inThrottle = false;

  return (...args: T) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
