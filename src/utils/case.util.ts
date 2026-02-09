export function toKebabCase(str: string) {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase();
}

export function toCamelCase(str: string) {
	return str
		.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
		.replace(/^(.)/, m => m.toLowerCase());
}

export function toPascalCase(str: string) {
	const camel = toCamelCase(str);
	return camel.charAt(0).toUpperCase() + camel.slice(1);
}