function App() {
  return (
    <div className="min-h-screen bg-brown-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Typography Scale Demo */}
        <div className="space-y-4">
          <h1 className="text-headline-1">Headline 1</h1>
          <h2 className="text-headline-2">Headline 2</h2>
          <h3 className="text-headline-3">Headline 3</h3>
          <h4 className="text-headline-4">Headline 4</h4>
          <p className="text-body-1">
            Body 1 - This is body text with medium weight (500). Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="text-body-2">
            Body 2 - This is also body text with the same size and weight. Sed
            do eiusmod tempor incididunt ut labore.
          </p>
          <p className="text-body-3">
            Body 3 - This is also body text with the same size and weight. Sed
            do eiusmod tempor incididunt ut labore.
          </p>
        </div>

        {/* Color Demo */}
        <div className="space-y-4 pt-8 border-t border-brown-300">
          <h2 className="text-headline-3 text-brown-600">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-brown-600 p-4 rounded text-white text-body-1">
              Brown 600
            </div>
            <div className="bg-brown-500 p-4 rounded text-white text-body-1">
              Brown 500
            </div>
            <div className="bg-brown-400 p-4 rounded text-white text-body-1">
              Brown 400
            </div>
            <div className="bg-brown-300 p-4 rounded text-brown-600 text-body-1">
              Brown 300
            </div>
            <div className="bg-brand-orange p-4 rounded text-white text-body-1">
              Brand Orange
            </div>
            <div className="bg-brand-green p-4 rounded text-white text-body-1">
              Brand Green
            </div>
            <div className="bg-brand-green-soft p-4 rounded text-white text-body-1">
              Brand Green Soft
            </div>
            <div className="bg-brand-red p-4 rounded text-brown-600 text-body-1">
              Brand Red
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
