export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  const thisDay = state.days.find((weekday) => weekday.name === day);
	if (!thisDay) {
		return [];
	}
	let appointmentsOnThisDay = [];
	thisDay.appointments.forEach((appointmentID) => {
		const appmtObject = state.appointments[appointmentID];
		appmtObject && appointmentsOnThisDay.push(appmtObject);
	});
	return appointmentsOnThisDay;
}