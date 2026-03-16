import { Typography } from "antd";
import type { User } from "../../../shared/types";

const { Paragraph } = Typography;

interface SingleUserProps {
  user: User;
}

export const UserCard = ({ user }: SingleUserProps) => {
  const userFields = [
    { label: "Name", value: user.name },
    { label: "UserName", value: user.username },
    { label: "Email", value: user.email },
    { label: "Street", value: user.address.street },
    { label: "Suite", value: user.address.suite },
    { label: "City", value: user.address.city },
    { label: "ZipCode", value: user.address.zipcode },
    { label: "GeoLat", value: user.address.geo.lat },
    { label: "GeoLng", value: user.address.geo.lng },
    { label: "Phone", value: user.phone },
    { label: "Website", value: user.website },
    { label: "CompanyName", value: user.company.name },
    { label: "CatchPhrase", value: user.company.catchPhrase },
    { label: "CompanyBS", value: user.company.bs },
  ];

  return (
    <>
      {userFields.map(({ label, value }) => (
        <Paragraph key={label}>
          <strong>{label}:</strong> {value}
        </Paragraph>
      ))}
    </>
  );
};