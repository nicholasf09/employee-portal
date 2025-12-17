export default function Loading() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="h-6 w-40 rounded bg-gray-200 animate-pulse" />
      <div className="h-4 w-64 rounded bg-gray-200 animate-pulse mt-3" />
      <div className="space-y-3 mt-8">
        <div className="h-20 rounded bg-gray-200 animate-pulse" />
        <div className="h-20 rounded bg-gray-200 animate-pulse" />
        <div className="h-20 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  )
}
