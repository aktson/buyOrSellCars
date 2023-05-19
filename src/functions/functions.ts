/**
 * Makes sure a value is a string
 * @param {string} value
 * @return {string}
 */
function safeString(value = "") {
	if (typeof value === "string") return value;
	return "";
}

/**
 * Makes the first character in a string uppercase.
 * @param text string to be formatted.
 * @return text with uppercase first char.
 */
export const capitalize = (text = "") => {
	const thisText = safeString(text);
	const textArray = thisText.split("");
	textArray[0] = safeString(textArray[0]).toUpperCase();
	return textArray.join("");
};

/**
 * Function that returns firstName and lastName from fullName
 * @param {string} fullName
 * @returns {genObject} object with firstName and lastName
 */
export function getFirstAndLastname(fullName: string): object {
	if (!fullName) return { firstName: "", lastName: "" };

	const nameArray = fullName?.trim().split(" ");
	const capitalizedNameArray = nameArray.map((name) => capitalize(name));

	const lastName = capitalizedNameArray.length > 1 ? capitalizedNameArray.pop?.() || "" : "";
	const firstName = capitalizedNameArray.join?.(" ") || "";

	return { firstName, lastName };
}

/** Get initials from firstName and LastName
 * @param {event}
 * @return {void}
 */
export function getInitials(fullName: string) {
	const { firstName, lastName } = getFirstAndLastname(fullName) as any;
	const firstNameInitial = firstName.charAt(0);
	const lastNameInitial = lastName.charAt(0);
	return firstNameInitial + lastNameInitial || firstNameInitial || lastNameInitial;
}
