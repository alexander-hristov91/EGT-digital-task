import { DeletePost } from "../features/DeletePost/DeletePost";
import { UpdatePost } from "../features/UpdatePost/UpdatePost";

interface PostActionsProps {
  isEditing: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onSave: () => Promise<void> | void; 
  onCancel: () => void;
  onDelete: () => Promise<boolean>; 
}

export default function PostActions({
  isEditing,
  isUpdating,
  isDeleting,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: PostActionsProps) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <UpdatePost
        isEditing={isEditing}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
      />
       {!isEditing && (
        <DeletePost
          onDelete={onDelete}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
}
