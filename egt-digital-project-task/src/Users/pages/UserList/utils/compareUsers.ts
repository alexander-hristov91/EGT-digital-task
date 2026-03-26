import type { User } from "../../../shared/types";

export function hasUserChanges(original: User, edited: User): boolean {
  const topLevelFields: (keyof User)[] = [
    "id",
    "username",
    "email",
    "name",
    "phone",
    "website",
  ];

  for (const field of topLevelFields) {
    if (original[field] !== edited[field]) {
      return true;
    }
  }

  if (
    original.address?.street !== edited.address?.street ||
    original.address?.suite !== edited.address?.suite ||
    original.address?.city !== edited.address?.city ||
    original.address?.zipcode !== edited.address?.zipcode
  ) {
    return true;
  }

  if (
    original.company?.name !== edited.company?.name ||
    original.company?.catchPhrase !== edited.company?.catchPhrase ||
    original.company?.bs !== edited.company?.bs
  ) {
    return true;
  }

  return false;
}
