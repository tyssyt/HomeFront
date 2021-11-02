function stringify(value: any): string {
  const cache: any[] = [];
  return JSON.stringify(value, (key, value) => {
	  if (typeof value === "object" && value !== null) {
	    if (cache.indexOf(value) !== -1) {
	      return "[[circular]]";
	    }
	    cache.push(value);
	  }
	  return value;
  }, 1);
}
