var jsonjadn = $.getJSON("assets/openc2.json", function (data) {

$.each(jsonjadn.responseJSON.types, function(i, item) {
valueTypes[item[0]] = item[1];
});
var actuator_specifiers = jsonjadn.responseJSON.types[7][4]; //retrieves actuator_specifiers
var unsortedActions = jsonjadn.responseJSON.types[4][4]; //retrieves actions
var unsortedTargets = jsonjadn.responseJSON.types[5][4]; //retrieves targets
var allTargetSpecifiers = jsonjadn.responseJSON.types[5][4];
codes['encryption_algorithm'] = jsonjadn.responseJSON.types[28][4];
codes['hashes'] = jsonjadn.responseJSON.types[27][4];
var allUnsortedActions = [];
i = 0;
while (i < unsortedActions.length) {
allUnsortedActions.push(unsortedActions[i][1]);
i++;
}
var allActions = allUnsortedActions.sort();
var allUnsortedTargets = [];
i = 0;
while (i < unsortedTargets.length) {
allUnsortedTargets.push(unsortedTargets[i][2]);
i++;
}
var allTargets = allUnsortedTargets.sort();

var allActuators = jsonjadn.responseJSON.types[6][4];

var allActuatorSpecifiers = jsonjadn.responseJSON.types[7][4];

$.each(allActions, function (i, item) {
$('#actionId').append('<a class="dropdown-item actionDropDownMenu" role="presentation" href="#" id=' + item + "SelectionId" + '>' + item + '</a>');
});
$.each(allTargets, function (i, item) {
$('#targetId').append('<a class="dropdown-item targetDropDownMenu" role="presentation" href="#" id=' + item + "SelectionId" + '>' + item + '</a>');
});
$.each(allTargetSpecifiers, function (i, item) {
$('#targetSpecifiersId').append('<a class="dropdown-item targetSpecifierDropDownMenu" role="presentation" href="#" id=' + item[1] + "SelectionId" + '>' + item[1] + '</a>');
});
$.each(allActuators, function (i, item) {
$('#actuatorId').append('<a class="dropdown-item actuatorDropDownMenu" role="presentation" href="#" id=' + item[1] + "SelectionId" + '>' + item[1] + '</a>');
});
$.each(allActuatorSpecifiers, function (i, item) {
$('#actuatorSpecifierId').append('<a class="dropdown-item actuatorSpecifierDropDownMenu" role="presentation" href="#" id=' + item[1] + "SelectionId" + '>' + item[1] + '</a>');
});
});