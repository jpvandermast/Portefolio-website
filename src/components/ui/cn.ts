/** Voegt klassen samen en slaat lege waarden over. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
