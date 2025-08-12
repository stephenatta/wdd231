// scripts/storage.js
export function getUnits() {
  return localStorage.getItem('aw_units') || 'metric';
}
export function setUnits(units) {
  localStorage.setItem('aw_units', units);
}
export function getDismissedModal() {
  return localStorage.getItem('aw_modal_dismissed') === 'true';
}
export function setDismissedModal() {
  localStorage.setItem('aw_modal_dismissed', 'true');
}
