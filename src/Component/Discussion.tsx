import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Store/store";
import { addComment, addReply } from "..//Reducer/CommentsSlice";
import profileImg from "../assets/image/Profile.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Auth/Firebase";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { addCommentToFirestore } from "../Auth/Firebase";

interface Comment {
  id: number;
  text: string;
  replies: Comment[];
}

const Discussion: FC = () => {
  let [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<"discussion" | "review">("discussion");
  const dispatch = useDispatch<AppDispatch>();
   comments = useSelector((state: RootState) => state.comments.comments);

  const [input, setInput] = useState("");
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});
  const [showReplyInput, setShowReplyInput] = useState<{ [key: number]: boolean }>({});
  const [username, setUsername] = useState<string | null>(null);
  const [user] = useAuthState(auth)

  // Add a new comment
  const handleAddComment = async (e:any) => {
    if(e.key === 'Enter') {
    if (input.trim()) {
      dispatch(addComment(input));
      if (user) {
        await addCommentToFirestore(user.uid, input);  // Save comment to Firestore
      }
      setInput("");
    }
}
  };

  // Add a reply to a specific comment
  const handleAddReply = (commentId: number) => {
    if (replyInputs[commentId]?.trim()) {
      dispatch(addReply({ commentId, replyText: replyInputs[commentId] }));
      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      setShowReplyInput((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  // Toggle reply input visibility
  const toggleReplyInput = (commentId: number) => {
    setShowReplyInput((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Recursive function to render comments and their replies
  const renderComments = (commentsList: Comment[], isReply = false) =>
    commentsList.map((comment) => (
      <div key={comment.id} className="relative ml-4 mt-4">
        {isReply && (
          <div className="absolute left-0 top-0 h-full w-4 -ml-4 flex items-center">
            <div className="h-full w-0.5 bg-cyan-300 relative">
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cyan-300"></div>
            </div>
          </div>
        )}

        <div className="flex items-start justify-between p-4 rounded-md shadow bg-gray-100">
          <div className="flex items-start space-x-3">
            <img src={user?.photoURL ?? profileImg} alt="Profile" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-cyan-600">{username ? username : user?.displayName}</p>
              <p className="text-gray-800">{comment.text}</p>
            </div>
          </div>
          <button onClick={() => toggleReplyInput(comment.id)}
            className="text-cyan-700 text-sm hover:underline">Reply
          </button>
        </div>

        {showReplyInput[comment.id] && (
          <div className="ml-6 mt-2 flex items-center">
            <input
              type="text"
              value={replyInputs[comment.id] || ""}
              onChange={(e) =>
                setReplyInputs((prev) => ({ ...prev, [comment.id]: e.target.value }))
              }
              placeholder="Write a reply..."
              className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            <button
              onClick={() => handleAddReply(comment.id)}
              className="px-4 py-2 bg-cyan-700 text-white font-medium rounded-r-md hover:bg-cyan-800"
            >
              Reply
            </button>
          </div>
        )}

        {comment.replies.length > 0 && (
          <div className="ml-6">{renderComments(comment.replies, true)}</div>
        )}
      </div>
    ));

    useEffect(() => {
        const fetchComments  = async () => {
          if (user) {
            const userDocRef = doc(getFirestore(), "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            const db = getFirestore();
        const commentsRef = collection(db, "users", user.uid, "comments");
        const snapshot = await getDocs(commentsRef);
        
        const fetchedComments: Comment[] = snapshot.docs.map((doc:any) => ({
          id: doc.id,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          replies: []
        }));
        setComments(fetchedComments); 

            if (userDoc.exists()) {
              setUsername(userDoc.data()?.username);
            } else {
              console.log("No such document!");
            }
          }
        };
    
        fetchComments ();
      }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 border-b-2 border-gray-300 pb-2">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "discussion"
              ? "text-cyan-700 border-b-4 border-cyan-700"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("discussion")}
        >
          Discussion
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "review"
              ? "text-cyan-700 border-b-4 border-cyan-700"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("review")}
        >
          Review
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {activeTab === "discussion" && (
          <div className="px-5">
            <h1 className="font-bold text-xl text-cyan-700">Social Discussion</h1>
            <p className="mt-2 text-gray-600">Share your thoughts or reply to others.</p>

            {/* Comment Input */}
            <div className="flex items-center mt-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                onKeyPress={handleAddComment}
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-cyan-700 text-white font-medium rounded-r-md hover:bg-cyan-800"
              >
                Add Comment
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-5 space-y-3 overflow-auto" style={{ maxHeight: "400px" }}>
              {comments.length > 0 ? (
                renderComments(comments)
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "review" && (
          <div className="px-5">
            <h1 className="font-bold text-xl text-cyan-700">User Reviews</h1>
            <p className="mt-2 text-gray-600">
              Reviews will be displayed here. This feature is under development!
            </p>
            <div className="mt-5 text-gray-500">
              {/* Placeholder for future review implementation */}
              No reviews yet. Be the first to share your thoughts!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;