export interface UserFieldConfig {
  key: string | string[];
  label: string;
  validation?: (value: string) => string | undefined;
}

export function getUserFields(): UserFieldConfig[] {
  return [
    {
      key: "username",
      label: "Username",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: ["address", "street"],
      label: "Street",
    },
    {
      key: ["address", "suite"],
      label: "Suite",
    },
    {
      key: ["address", "city"],
      label: "City",
    },
    { key: ["address", "zipcode"], label: "ZipCode" },
    { key: "phone", label: "Phone" },
    { key: "website", label: "Website" },
    { key: ["company", "name"], label: "CompanyName" },
    { key: ["company", "catchPhrase"], label: "CatchPhrase" },
    { key: ["company", "bs"], label: "CompanyBS" },
  ];
}
