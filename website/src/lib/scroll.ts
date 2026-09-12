/** Smooth-scroll to the element with the given id, if it exists. */
export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
