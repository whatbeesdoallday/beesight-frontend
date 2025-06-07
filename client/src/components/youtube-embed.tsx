interface YoutubeEmbedProps {
  videoId?: string;
  title?: string;
}

export default function YoutubeEmbed({ 
  videoId = "YOUR_VIDEO_ID", 
  title = "Live Bee Stream" 
}: YoutubeEmbedProps) {
  // If no video ID is provided, show placeholder
  if (videoId === "YOUR_VIDEO_ID") {
    return (
      <div className="aspect-video bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🐝</div>
          <h3 className="text-xl font-semibold mb-2">Live Stream</h3>
          <p className="text-gray-300 mb-4">Replace with YouTube embed URL</p>
          <div className="text-sm text-gray-400 max-w-md">
            To add your live stream, replace "YOUR_VIDEO_ID" in the YoutubeEmbed component 
            with your actual YouTube video ID.
          </div>
          <div className="mt-4 text-xs text-gray-500 font-mono">
            Example: &lt;YoutubeEmbed videoId="dQw4w9WgXcQ" /&gt;
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
