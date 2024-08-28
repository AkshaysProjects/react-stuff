export default function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-primary h-24 w-24 animate-ping rounded-full border-8 opacity-75"></div>
        </div>
        <div className="relative h-24 w-24">
          <div className="border-primary h-24 w-24 animate-spin rounded-full border-8 border-t-transparent"></div>
          <div className="bg-primary absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
