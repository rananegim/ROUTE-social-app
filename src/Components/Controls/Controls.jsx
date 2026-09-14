import React, { useState } from "react";
import { Dropdown, Label, toast } from "@heroui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "@heroui/react";

export default function Controls({ post }) {
  const postId = post.id;

  const navigate = useNavigate();
  const query = useQueryClient();

  // ---- Delete post ----
  function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("post deleted");
      query.invalidateQueries({ queryKey: ["getPosts"] });
      query.invalidateQueries({ queryKey: ["getProfilePosts"] });
      navigate("/feed");
    },
    onError: () => {
      toast.error("canot delete successfully");
    },
  });

  // ---- Edit post ----
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [body, setBody] = useState(post.body || "");
  const [image, setImage] = useState(null);

  function editPost() {
    const formData = new FormData();
    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }

    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  const { mutate: handleEditPost, isPending: isEditing } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      toast.success("post updated");
      query.invalidateQueries({ queryKey: ["getPosts"] });
      query.invalidateQueries({ queryKey: ["getProfilePosts"] });
      query.invalidateQueries({ queryKey: ["getSinglePost", postId] });
      setIsEditOpen(false);
    },
    onError: () => {
      toast.error("cannot update post");
    },
  });

  return (
    <div>
      <Dropdown>
        <Button aria-label="Menu">
          <i className="fa-solid fa-pen-to-square"></i>
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            onAction={(key) => {
              if (key === "edit-post") setIsEditOpen(true);
              if (key === "delete-post") handleDeletePost();
            }}
          >
            <Dropdown.Item id="edit-post" textValue="Edit post">
              <Label>Edit post</Label>
            </Dropdown.Item>
            <Dropdown.Item
              id="delete-post"
              textValue="Delete post"
              variant="danger"
            >
              <Label>Delete post</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* Edit Modal - controlled */}
      <Modal isOpen={isEditOpen} onOpenChange={setIsEditOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.CloseTrigger>
                <button aria-label="Close">
                  <i className="fa-solid fa-xmark" />
                </button>
              </Modal.CloseTrigger>
              <Modal.Header>
                <Modal.Heading>Edit Post</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <textarea
                  className="w-full border rounded p-2 mb-3"
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="w-full"
                  onClick={() => handleEditPost()}
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