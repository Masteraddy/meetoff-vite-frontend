import { useState, useRef, useEffect } from 'react';

const Feedback = ({ submitFeedback }) => {
  return (
    <div className="bg-white rounded px-8 pt-6 pb-8 mx-auto max-w-lg flex flex-col justify-center item-center h-full">
      <h1 className="text-2xl mb-3 mx-auto">Feedback page is here</h1>
      <div className="bg-white rounded-t-lg my-5">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows={4}
          className="w-full px-3 py-3 text-sm text-gray-900 bg-gray-100 border-0 focus:ring-0 shadow-lg"
          placeholder="Write a comment..."
          required
          defaultValue={''}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-gray-800 hover:bg-gray-400 text-white font-bold w-full py-2 px-4 rounded"
          type="button"
          onClick={() => submitFeedback()}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
