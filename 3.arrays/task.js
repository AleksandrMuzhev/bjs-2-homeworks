function compareArrays(arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return false;
	}

	return arr1.every(function(element, index) {
		return element === arr2[index];
	})
}

function getUsersNamesInAgeRange(users, gender) {
	if (users.length === 0) {
		return 0;
	}
	const user_filtres = users.filter(user => user.gender === gender);
	if (user_filtres.length === 0) {
		return 0;
	}
	const ages = user_filtres.map(user => user.age);
	const avgAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;
	return avgAge;
}