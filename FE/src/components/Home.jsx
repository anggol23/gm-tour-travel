import { Carousel, Container } from 'react-bootstrap';
import '../index.css'; // Pastikan path ini sesuai

function Home() {
  return (
    <Container className="home-container">
      <Carousel className="home-carousel">
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src="gunung.jpeg" alt="First slide" />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Explore Wonderful Destinations</h3>
            <p>Discover the beauty of the world with us.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src="pantai.jpeg" alt="Second slide" />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Unforgettable Experiences</h3>
            <p>Make your travel dreams come true.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src="desa.jpeg" alt="Third slide" />
          <Carousel.Caption className="carousel-caption-custom">
            <h3>Beautiful Villages</h3>
            <p>Experience the serenity of rural life.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Home;
