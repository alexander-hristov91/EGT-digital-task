import { useState } from "react";
import type { User } from "./userSlice";
import { Card } from "antd";

interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {

  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Card
      title={
        <>
      <p>{user.name} with id {user.id}</p>
      </>
    }

      extra={
        <a onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
          {expanded ? "Show Less" : "Show More"}
        </a>
      }
      style={{ width: 400 }}
    >
     {expanded && (
      <>
      <p>Name: {user.name}</p>
      <p>UserName: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Street: {user.address.street}</p>
      <p>Suite: {user.address.suite}</p>
      <p>City: {user.address.city}</p>
      <p>ZipCode: {user.address.zipcode}</p>
      <p>GeoLat: {user.address.geo.lat}</p>
      <p>GeoLng: {user.address.geo.lng}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>CompanyName: {user.company.name}</p>
      <p>CatchPhrase: {user.company.catchPhrase}</p>
      <p>CompanyBS: {user.company.bs}</p>
      </>
     )}
    </Card>
  );
}
