export default function CrosswordCard({ title, image, description }) {
    return (
      <div className="card">
        <img src={image} className="card-img-top" alt="Card Image" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href="#" className="btn btn-primary">
            Spręsti
          </a>
        </div>
      </div>
    );
  }