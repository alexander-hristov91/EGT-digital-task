import type { User } from "../../../shared/types";

export function validateUserField(
  name: string,
  value: string,
): string | undefined {
  const trimmed = value.trim();

  if (
    !trimmed &&
    [
      "username",
      "email",
      "address.street",
      "address.suite",
      "address.city",
    ].includes(name)
  ) {
    const labels: Record<string, string> = {
      username: "Username",
      email: "Email",
      "address.street": "Street",
      "address.suite": "Suite",
      "address.city": "City",
    };
    return `${labels[name] || name} is required`;
  }

  if (
    name === "email" &&
    trimmed &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  ) {
    return "Please enter a valid email address (e.g., name@domain.com)";
  }

  return undefined;
}

export function validateUser(user: User): { isValid: boolean; error?: string } {
  const checks = [
    { field: "username", value: user.username, label: "Username" },
    { field: "email", value: user.email, label: "Email" },
    { field: "address.street", value: user.address.street, label: "Street" },
    { field: "address.suite", value: user.address.suite, label: "Suite" },
    { field: "address.city", value: user.address.city, label: "City" },
  ];

  for (const { value, label } of checks) {
    if (!value?.trim()) {
      return { isValid: false, error: `${label} is required` };
    }
  }

  if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address (e.g., name@domain.com)",
    };
  }

  return { isValid: true };
}
