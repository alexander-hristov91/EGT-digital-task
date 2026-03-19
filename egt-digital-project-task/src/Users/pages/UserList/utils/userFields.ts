import type { User } from "../../../shared/types";

export interface UserFieldConfig {
  key: string;
  label: string;
  validation?: (value: string) => string | undefined;
}

export function getUserFields(): UserFieldConfig[] {
  return [
    { key: 'username', label: 'Username', validation: (v) => !v ? 'Username Required' : undefined },
    { key: 'email', label: 'Email',  validation: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please enter a valid email...' : undefined },
    { key: 'name', label: 'Name',  validation: (v) => !v ? 'Name Required' : undefined },
    { key: 'address.street', label: 'Street', validation: (v) => !v ? 'Street Required' : undefined },
    { key: 'address.suite', label: 'Suite', validation: (v) => !v ? 'Suite Required' : undefined },
    { key: 'address.city', label: 'City',  validation: (v) => !v ? 'City Required' : undefined },
    { key: 'address.zipcode', label: 'ZipCode', },
    { key: 'phone', label: 'Phone', },
    { key: 'website', label: 'Website', },
    { key: 'company.name', label: 'CompanyName', },
    { key: 'company.catchPhrase', label: 'CatchPhrase', },
    { key: 'company.bs', label: 'CompanyBS', },
  ];
}

export function getUserFieldValue(user: User, key: string): string {
  const value = key.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, user);
  
  return value !== null && value !== undefined ? String(value) : '';
}

export function validateUserFields(user: User): Record<string, string> {
  return getUserFields().reduce((errors, field) => {
    if (!field.validation) return errors;
    
    const value = getUserFieldValue(user, field.key);
    const errorMsg = field.validation(value);
    
    if (errorMsg) {
      errors[field.key] = errorMsg;
    }
    return errors;
  }, {} as Record<string, string>);
}