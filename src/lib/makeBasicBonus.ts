/**
 * given a score for basic, calculate the bonus
 * @param {number} score 
 * @returns {number} bonus
 */
function makeBasicBonus (score: number) : number{
	// min, max, bonus
	const brackets = [
		[63,70,35],
		[71,77,55],
		[78,9999,75]
	];

	const matchingBracket = brackets.find((b) => {
		// try to match bracket to min and max
		if (score >= b[0] && score <= b[1])
			return true;
	});

	if (matchingBracket) return matchingBracket[2];

	else return 0;
}

export default makeBasicBonus;