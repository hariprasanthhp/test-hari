/**
 * @description - Allow only numbers
 * @param event - Keypress Event
 */
export function enterNumberOnly(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (event.keyCode === 13) {
      return true;
    } else if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
}
