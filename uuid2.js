function getNumber() {
	val = Math.floor(Math.random() * 16)
	return val.toString(16)
}

function get_value(entries) {
	var valueToReturn = 0;
	var i = 0;
	while (i < entries) {
		valueToReturn += getNumber();
		i++;
	}
	return valueToReturn
}
function uuidGet() {
	return get_value(9) + '-' + get_value(3) + '-' + get_value(3) + '-' + get_value(3) + '-' + get_value(11)

}