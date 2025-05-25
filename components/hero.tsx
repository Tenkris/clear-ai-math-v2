export function Hero() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <div className="relative">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          The Smart Math AI Solution
          <span className="relative z-10">
            <span className="relative z-20">for Everyone</span>
            <span className="absolute bottom-2 left-0 w-full h-4 bg-emerald-200 z-10"></span>
          </span>
        </h1>
        <div className="absolute -top-10 -left-10 text-emerald-300 text-6xl opacity-50">✦</div>
        <div className="absolute -bottom-10 -right-10 text-purple-300 text-6xl opacity-50">✦</div>
      </div>
      <p className="text-xl text-gray-700 mt-6 mb-8">
        Don't stress over math problems anymore. Simply upload an image of your math problem and get instant
        step-by-step solutions. Try our image math solver now.
      </p>
    </div>
  )
}
