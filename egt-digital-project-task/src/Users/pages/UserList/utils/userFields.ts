export interface UserFieldConfig {
  key: string;
  label: string;
  validation?: (value: string) => string | undefined;
}

export function getUserFields(): UserFieldConfig[] {
  return [
    {
      key: "username",
      label: "Username",
      validation: (v) => (!v ? "Username Required" : undefined),
    },
    {
      key: "email",
      label: "Email",
      validation: (v) =>
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          ? "Please enter a valid email..."
          : undefined,
    },
    {
      key: "name",
      label: "Name",
      validation: (v) => (!v ? "Name Required" : undefined),
    },
    {
      key: "address.street",
      label: "Street",
      validation: (v) => (!v ? "Street Required" : undefined),
    },
    {
      key: "address.suite",
      label: "Suite",
      validation: (v) => (!v ? "Suite Required" : undefined),
    },
    {
      key: "address.city",
      label: "City",
      validation: (v) => (!v ? "City Required" : undefined),
    },
    { key: "address.zipcode", label: "ZipCode" },
    { key: "phone", label: "Phone" },
    { key: "website", label: "Website" },
    { key: "company.name", label: "CompanyName" },
    { key: "company.catchPhrase", label: "CatchPhrase" },
    { key: "company.bs", label: "CompanyBS" },
  ];
}
