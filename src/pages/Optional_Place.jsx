export default function Optional_Place({ onPrev, onNext }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Optional — Place</h1>
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded bg-gray-200" onClick={onPrev}>
          ← Time
        </button>
        <button className="px-4 py-2 rounded bg-blue-500 text-white" onClick={onNext}>
          Etc →
        </button>
      </div>
    </div>
  );
}
