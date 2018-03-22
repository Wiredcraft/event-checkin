// Utilities

/* 
  String normalizer for guest list search feature.

  Normalizes strings by NFD and replaces Combining Diacritical Marks Unicode group characters.

 */
export const stringNormalizer = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default {
	stringNormalizer
}
