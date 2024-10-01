import "./UpcomingCard.css";
const UpcomingCard = ({
  title,
  image,
  trailerVideoId,
  setIsPlaying,
  setTrailerId,
}) => {

  const trimmedTitle = title.length > 36 ? title.slice(0, 36) + "..." : title;
  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          setTrailerId(trailerVideoId);
          setIsPlaying(true);
        }}
        className="upcomingcard-wrapper"
      >
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
          href="/"
          className="upcomingcard-title"
        >
          <p>{trimmedTitle}</p>
          <span></span>
        </a>

        <div
          className="upcomingcard-card"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>

        
      </div>
    </>
  );
};
export default UpcomingCard;
