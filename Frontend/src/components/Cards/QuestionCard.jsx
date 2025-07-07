import React, { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuSparkles } from 'react-icons/lu';
import { PiPushPinFill, PiPushPin } from 'react-icons/pi';
import { motion, AnimatePresence } from "framer-motion";
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if(isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    }
    else{
      setHeight(0);
    }
  },[isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }
  return (
    <div className="bg-white md:w-[55vw] rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl border border-gray-100/60 group">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3.5">
          <span className="text-sm md:text-[15px] font-semibold text-gray-400 leading-[25px]">
            Q.
          </span>

          <h3 className="text-base md:text-[15.5px] font-semibold text-black mr-0 md:mr-20"
          onClick={toggleExpand}>
            {question}
          </h3>
        </div>

        <div className="flex items-center justify-end ml-4 relative">
          <div className={`flex ${isExpanded? "md:flex":"md:hidden group-hover:flex"}`}
          >
            <button
            className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-200 hover:border-indigo-500 cursor-pointer"
            onClick={() => onTogglePin(question)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isPinned ? "pinned" : "unpinned"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isPinned ? (
                    <PiPushPinFill className="text-sm text-indigo-500" />
                  ) : (
                    <PiPushPin className="text-sm" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
            className="flex items-center gap-2 text-sm text-cyan-800 font-medium bg-cyan-100 px-3 py-1 mr-2 rounded text-nowrap border border-cyan-300 hover:border-cyan-500 cursor-pointer"
            onClick={() => {
              setIsExpanded(true);
              onLearnMore();
            }}
            >
              <LuSparkles />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>

          <button
          className="text-gray-400 hover:text-gray-500 cursor-pointer"
          onClick={toggleExpand}
          >
            <LuChevronDown className={`transform transition-transform duration duration-300 ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight:`${height}px` }}
      >
        <div
        ref={contentRef}
        className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
        >
          <AIResponsePreview
          content={answer}
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;