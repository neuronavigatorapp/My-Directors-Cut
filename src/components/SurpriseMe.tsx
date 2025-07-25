"use client";

export default function SurpriseMe({ onSelect, disabled }: { onSelect: () => void; disabled: boolean }) {
  return (
    <div className="text-center mt-6">
      <button
        onClick={onSelect}
        disabled={disabled}
        className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded disabled:opacity-50"
      >
        Surprise Me
      </button>
    </div>
  );
}
