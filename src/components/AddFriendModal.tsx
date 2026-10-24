import React, { useState } from 'react';
import { Copy, Check, UserPlus, Sparkles, X, AlertCircle } from 'lucide-react';
import { FriendRequest } from '../types';

interface AddFriendModalProps {
  userInviteCode: string;
  onClose: () => void;
  onSendCode: (code: string) => { success: boolean; message: string };
  pendingRequests: FriendRequest[];
  onAcceptRequest: (reqId: string) => void;
  onDeclineRequest: (reqId: string) => void;
  onSimulateIncomingRequest: () => void;
}

export const AddFriendModal: React.FC<AddFriendModalProps> = ({
  userInviteCode,
  onClose,
  onSendCode,
  pendingRequests,
  onAcceptRequest,
  onDeclineRequest,
  onSimulateIncomingRequest,
}) => {
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(userInviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setFeedback({ text: 'Please enter a 6-character code (e.g., POOP-99)', isError: true });
      return;
    }
    const res = onSendCode(inputCode.trim().toUpperCase());
    setFeedback({ text: res.message, isError: !res.success });
    if (res.success) {
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF7] dark:bg-[#201815] text-[#4E342E] dark:text-[#EFEBE9] w-full max-w-sm rounded-3xl border-2 border-[#4E342E] p-4 shadow-2xl relative animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#4E342E]/10 text-[#5D4037] dark:text-[#D7CCC8]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center pb-3 border-b border-[#4E342E]/10">
          <span className="text-sm font-black font-pixel text-[#4E342E] dark:text-[#FFE082]">
            ADD POOP PAL
          </span>
          <p className="text-[11px] text-[#8D6E63] mt-0.5">
            Connect securely without sharing email or phone numbers
          </p>
        </div>

        {/* 1. Share Your Code Card */}
        <div className="my-3 p-3 bg-[#FFF9EE] dark:bg-[#2A201C] rounded-2xl border border-[#4E342E]/15 text-center">
          <div className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider">
            Your Secret Invite Code
          </div>
          <div className="text-2xl font-black font-pixel my-1 tracking-widest text-[#4E342E] dark:text-[#FFE082]">
            {userInviteCode}
          </div>
          <button
            onClick={handleCopy}
            className="w-full py-1.5 px-3 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Code Copied to Clipboard!' : 'Copy Invite Code'}</span>
          </button>
        </div>

        {/* 2. Enter a Friend's Code Form */}
        <form onSubmit={handleSend} className="space-y-2">
          <label className="block text-xs font-bold text-[#5D4037] dark:text-[#D7CCC8]">
            Enter Friend&apos;s Invite Code:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="e.g. POOP-42"
              maxLength={10}
              className="flex-1 px-3 py-2 bg-white dark:bg-[#1A1412] border-2 border-[#4E342E]/30 rounded-xl text-xs font-mono font-bold tracking-wider uppercase focus:outline-hidden focus:border-[#4E342E]"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </form>

        {/* Feedback message */}
        {feedback && (
          <div
            className={`mt-2 p-2 rounded-xl text-[11px] font-bold flex items-center gap-1.5 ${
              feedback.isError
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {feedback.isError ? <AlertCircle className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* 3. Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#4E342E]/10 space-y-2">
            <div className="text-[10px] font-bold text-[#8D6E63] uppercase">
              Pending Friend Requests ({pendingRequests.length})
            </div>
            {pendingRequests.map((req) => (
              <div
                key={req.requestId}
                className="p-2 bg-amber-50 dark:bg-[#3E2723] rounded-xl border border-[#4E342E]/15 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#4E342E] dark:text-[#FFF8E1]">
                    {req.senderName}
                  </div>
                  <div className="text-[9px] text-[#8D6E63]">wants to compare daily flushes</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onAcceptRequest(req.requestId)}
                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => onDeclineRequest(req.requestId)}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-[#4E342E] dark:text-gray-200 rounded-lg text-[10px] font-bold"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Demo Mode Helper: Simulate Incoming Request */}
        <div className="mt-3 pt-3 border-t border-[#4E342E]/10 text-center">
          <button
            onClick={onSimulateIncomingRequest}
            className="text-[10px] font-bold text-[#5D4037] dark:text-[#FFE082] hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Simulate Incoming Request (Demo Mode)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
