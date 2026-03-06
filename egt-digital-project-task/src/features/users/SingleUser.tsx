import { useState } from "react";
import type { User } from "./userSlice";
import { Card, Typography } from "antd";

const { Text } = Typography;

interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      title={`${user.name} (Id: ${user.id})`}
      extra={
        <Text
          onClick={() => setExpanded(!expanded)}
          style={{
            cursor: "pointer",
            color: expanded ? "#1890ff" : "inherit",
            fontWeight: expanded ? 600 : 400,
          }}
        >
          {expanded ? "Show Less" : "Show More"}
        </Text>
      }
      style={{ width: 400 }}
    >
      {expanded && (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>UserName:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Street:</strong> {user.address.street}</p>
          <p><strong>Suite:</strong> {user.address.suite}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>ZipCode:</strong> {user.address.zipcode}</p>
          <p><strong>GeoLat:</strong> {user.address.geo.lat}</p>
          <p><strong>GeoLng:</strong> {user.address.geo.lng}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>CompanyName:</strong> {user.company.name}</p>
          <p><strong>CatchPhrase:</strong> {user.company.catchPhrase}</p>
          <p><strong>CompanyBS:</strong> {user.company.bs}</p>
        </>
      )}
    </Card>
  );
}