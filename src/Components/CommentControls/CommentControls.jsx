import React, { useState } from "react";
import { Dropdown, Label, toast } from "@heroui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "@heroui/react";

export default function CommentControls({ postId, comment, queryKey }) {
  const commentId = comment._id;

  const query = useQueryClient();

  // ---- Delete comment ----
  function deleteComment() {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  const { mutate: handleDeleteComment } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success("comment deleted");
      query.invalidateQueries({ queryKey: queryKey });
    },
    onError: () => {
      toast.danger("cannot delete comment");
    },
  });

  // ---- Edit comment ----
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [content, setContent] = useState(comment.content || "");

  function editComment() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  const { mutate: handleEditComment, isPending: isEditing } = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      toast.success("comment updated");
      query.invalidateQueries({ queryKey: queryKey });
      setIsEditOpen(false);
    },
    onError: () => {
      toast.danger("cannot update comment");
    },
  });

  return (
    <div>
      <Dropdown>
        <Button aria-label="Menu">
          <i className="fa-solid fa-ellipsis"></i>
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            onAction={(key) => {
              if (key === "edit-comment") setIsEditOpen(true);
              if (key === "delete-comment") handleDeleteComment();
            }}
          >
            <Dropdown.Item id="edit-comment" textValue="Edit comment">
              <Label>Edit comment</Label>
            </Dropdown.Item>
            <Dropdown.Item
              id="delete-comment"
              textValue="Delete comment"
              variant="danger"
            >
              <Label>Delete comment</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* Edit Modal - controlled */}
      <Modal isOpen={isEditOpen} onOpenChange={setIsEditOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.CloseTrigger aria-label="Close">
                <i className="fa-solid fa-xmark" />
              </Modal.CloseTrigger>
              <Modal.Header>
                <Modal.Heading>Edit Comment</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <textarea
                  className="w-full border rounded p-2 mb-3"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="w-full"
                  onClick={() => handleEditComment()}
                  disabled={isEditing}
                >
                  {isEditing ? "Saving..." : "Save changes"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}