// String normalizer

export const stringNormalizer = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export default{
	stringNormalizer
}