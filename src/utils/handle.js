export function cutHTTP(input) {
	return input.replace(/[a-zA-z]+:\/\//g, '');
}
