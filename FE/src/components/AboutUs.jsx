import { Carousel, Container } from 'react-bootstrap';

function AboutUs() {
  return (
     <Container className="about-container">
      <Carousel className="about-carousel">
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src="personil.jpg" alt="First slide" />
          <Carousel.Caption className="carousel-caption-custom">
            <h1>ABOUT US</h1>
            <p>GM Tour & Travel</p>
          </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
       <div className="p-4">
      <p className="justify-text">
        GM Tour and Travel Purbalingga telah menjadi mitra perjalanan terpercaya sejak 2007. Berlokasi di Perumahan Griya Abdi Kencana, Jalan Anggrek 1 No 7, Purbalingga Wetan, Purbalingga, Jawa Tengah, kami selalu berkomitmen untuk memberikan layanan perjalanan yang berkualitas dan terpercaya bagi para pelanggan kami. Dengan pengalaman bertahun-tahun, kami telah melayani berbagai macam kebutuhan perjalanan, mulai dari wisata keluarga, perjalanan bisnis, hingga wisata religi. </p>
      <p className="justify-text">
        Kami memahami bahwa setiap pelanggan memiliki kebutuhan dan keinginan yang unik. Oleh karena itu, kami menawarkan berbagai pilihan paket wisata yang dirancang untuk memenuhi kebutuhan Anda, baik di dalam negeri maupun luar negeri. Dari petualangan alam yang menantang di pegunungan hingga liburan santai di pantai tropis, kami siap membantu Anda merencanakan perjalanan yang sempurna. Tim kami yang berdedikasi akan memastikan bahwa setiap detail perjalanan Anda diurus dengan cermat, sehingga Anda bisa menikmati setiap momen tanpa khawatir.</p>
      <p className="justify-text">
        Selain itu, kami juga menawarkan layanan khusus untuk perjalanan bisnis, dengan fokus pada kenyamanan dan efisiensi. Kami memahami betapa pentingnya perjalanan bisnis bagi kesuksesan perusahaan Anda, sehingga kami selalu berupaya untuk menyediakan layanan yang cepat, aman, dan sesuai dengan jadwal Anda. Kami juga memiliki jaringan kemitraan yang luas dengan berbagai penyedia layanan wisata, termasuk maskapai penerbangan, hotel, dan perusahaan transportasi, yang memungkinkan kami memberikan penawaran terbaik untuk Anda.</p>
      <p className="justify-text">
        Di GM Tour and Travel Purbalingga, kepuasan pelanggan adalah prioritas utama. Kami selalu berupaya untuk meningkatkan kualitas layanan kami dengan terus mengikuti perkembangan industri pariwisata dan berinovasi dalam menyediakan pengalaman perjalanan yang lebih baik. Dengan pelayanan yang ramah, profesional, dan penuh perhatian, kami yakin bahwa perjalanan Anda bersama kami akan menjadi pengalaman yang tak terlupakan. Mari ciptakan kenangan indah bersama GM Tour and Travel Purbalingga, karena setiap perjalanan adalah cerita yang layak untuk dikenang.</p>
    </div>
        </Container>
  );
}

export default AboutUs;
