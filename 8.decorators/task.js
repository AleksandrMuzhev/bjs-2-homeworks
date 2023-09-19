//Задача № 1
function cachingDecoratorNew(func) {
	const cache = [];

	return function(...args) {
		const hash = md5(JSON.stringify(args));

		const objectInCache = cache.find(obj => obj.hash === hash);
		if (objectInCache) {
			console.log("Из кеша: " + objectInCache.result);
			return "Из кеша: " + objectInCache.result;
		}
		const result = func.apply(this, args);
		console.log("Вычисляем: " + result);

		const objToAdd = {
			hash,
			result
		};
		cache.push(objToAdd);

		if (cache.length > 5) {
			cache.shift();
		}

		return "Вычисляем: " + result;
	}
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
	let timeout;
	let count = 0;

	function debounced(...args) {
		debounced.allCount++;
		if (!timeout) {
			count++;
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(this, args);
			timeout = null;
		}, delay);
	}

	Object.defineProperty(debounced, 'count', {
		get: function() {
			return count;
		}
	});

	debounced.allCount = 0;

	return debounced;
}