export default function HomeVideoSection() {
  return (
    <section className="py-5 video-section">
      <div className="container text-center">

        <h2 className="mb-4 fw-bold">Watch How We Work</h2>

        <div className="video-wrapper mx-auto">
          <iframe
            src="https://www.youtube.com/embed/hN7V1cVYw10"
            title="Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </section>
  );
}
