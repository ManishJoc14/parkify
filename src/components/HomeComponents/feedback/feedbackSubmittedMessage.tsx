export default function FeedbackSubmittedMessage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/
                2000/svg"
            className="h-10 w-10 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-2xl font-semibold text-gray-800">Thank you!</h1>
        </div>
        <p className="text-gray-600 text-center">
          Your feedback has been submitted successfully.
        </p>
      </div>
    </div>
  );
}
