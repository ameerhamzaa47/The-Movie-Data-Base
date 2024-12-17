import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: number;
  text: string;
  replies: Comment[];
}

interface CommentsState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // Add a new comment
    addComment: (state, action: PayloadAction<string>) => {
      const newComment: Comment = {
        id: Date.now(),
        text: action.payload,
        replies: [],
      };
      state.comments.push(newComment);
    },

    // Add a reply to a specific comment
    addReply: (
      state,
      action: PayloadAction<{ commentId: number; replyText: string }>
    ) => {
      const { commentId, replyText } = action.payload;

      const addReplyRecursively = (comments: Comment[], id: number, text: string): void => {
        comments.forEach((comment) => {
          if (comment.id === id) {
            const newReply: Comment = {
              id: Date.now(),
              text,
              replies: [],
            };
            comment.replies.push(newReply);
          } else if (comment.replies.length > 0) {
            addReplyRecursively(comment.replies, id, text);
          }
        });
      };

      addReplyRecursively(state.comments, commentId, replyText);
    },
  },
});

export const { addComment, addReply } = commentsSlice.actions;

export default commentsSlice.reducer;