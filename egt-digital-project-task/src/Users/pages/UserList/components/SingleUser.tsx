import { Button, Collapse, Form, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../shared/types";
import { EditUser } from "../features/UpdateUser/EditUser";
import { useUserEdit } from "../features/UpdateUser/useEditUser";
import { hasUserChanges } from "../utils/compareUsers";
import { UserForm } from "./UserForm";

interface SingleUserProps {
  user: User;
}

export default function SingleUser({ user }: SingleUserProps) {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm<User>();

  const formValues = Form.useWatch([], form);
  const hasChanged = hasUserChanges(user, formValues || user);

  const { updateUser, isUpdating } = useUserEdit();

  const handlers = {
    onEdit: () => {
      setIsEdit(true);
    },
    onSave: () => {
      form.submit();
    },
    onCancel: () => {
      form.resetFields();
      setIsEdit(false);
    },
  };

  const onFinish = (values: User) => {
    updateUser(values);
  };

  const items = [
    {
      key: "details",
      label: <span style={{ fontSize: 16, fontWeight: 600 }}>{user.name}</span>,
      children: (
        <Form
          form={form}
          initialValues={user}
          onFinish={onFinish}
          layout="vertical"
        >
          <UserForm isEdit={isEdit} user={user} />
        </Form>
      ),
      extra: (
        <Space>
          <EditUser
            isEdit={isEdit}
            hasChanged={hasChanged}
            isLoading={isUpdating}
            handlers={handlers}
          />
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/users/${user.id}`);
            }}
          >
            See Posts
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: 1230, marginBottom: 20 }}>
      <Collapse items={items} />
    </div>
  );
}
