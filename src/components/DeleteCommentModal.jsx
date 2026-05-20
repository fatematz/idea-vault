"use client";

import { AlertDialog, Button } from "@heroui/react";

export function DeleteCommentModal({ commentId, onDelete }) {
  return (
    <AlertDialog>
      <Button className="bg-red-500 text-white p-3 rounded-2xl cursor-pointer">
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Comment Permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>Are you sure you want to delete this comment? This action cannot be undone.</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button 
                slot="close" 
                variant="danger"
                onClick={() => onDelete(commentId)}
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}