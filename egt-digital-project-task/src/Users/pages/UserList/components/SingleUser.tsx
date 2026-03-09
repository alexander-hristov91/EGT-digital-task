import { Card, Collapse, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../shared/types";

const { Paragraph } = Typography;

interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {
  const navigate = useNavigate();

  const handleSeePosts = () => {
    navigate(`/users/${user.id}`);
  };
  const collapseItems = [
    {
      key: "1",
      label: <Button>Show Details and Edit</Button>,
      children: (
        <>
          <Paragraph>
            <strong>Name:</strong> {user.name}
          </Paragraph>
          <Paragraph>
            <strong>UserName:</strong> {user.username}
          </Paragraph>
          <Paragraph>
            <strong>Email:</strong> {user.email}
          </Paragraph>
          <Paragraph>
            <strong>Street:</strong> {user.address.street}
          </Paragraph>
          <Paragraph>
            <strong>Suite:</strong> {user.address.suite}
          </Paragraph>
          <Paragraph>
            <strong>City:</strong> {user.address.city}
          </Paragraph>
          <Paragraph>
            <strong>ZipCode:</strong> {user.address.zipcode}
          </Paragraph>
          <Paragraph>
            <strong>GeoLat:</strong> {user.address.geo.lat}
          </Paragraph>
          <Paragraph>
            <strong>GeoLng:</strong> {user.address.geo.lng}
          </Paragraph>
          <Paragraph>
            <strong>Phone:</strong> {user.phone}
          </Paragraph>
          <Paragraph>
            <strong>Website:</strong> {user.website}
          </Paragraph>
          <Paragraph>
            <strong>CompanyName:</strong> {user.company.name}
          </Paragraph>
          <Paragraph>
            <strong>CatchPhrase:</strong> {user.company.catchPhrase}
          </Paragraph>
          <Paragraph>
            <strong>CompanyBS:</strong> {user.company.bs}
          </Paragraph>
        </>
      ),
    },
  ];

  return (
    <Card
      title={
        <span style={{ textAlign: "center", width: "106%", display: "block" }}>
          {user.name}
        </span>
      }
      style={{ width: 1230, marginBottom: 20 }}
      extra={
        <Button type="primary" onClick={handleSeePosts}>
          See Posts
        </Button>
      }
    >
      <Collapse items={collapseItems} ghost expandIcon={() => null} />
    </Card>
  );
}
