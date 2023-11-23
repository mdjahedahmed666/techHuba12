
const Banner = () => {
  return (
<div className="hero min-h-screen bg-contain" style={{backgroundImage: 'url(https://i.ibb.co/CzY7H0t/lenovo-thinkbook-15-iil-20sm-p160273-171774-medium.png)'}}>
  <div className="hero-overlay bg-black bg-opacity-70"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">TechHub is a dynamic online platform that serves as a vibrant hub for technology enthusiasts, innovators, and consumers alike. It is designed to be the go-to destination for discovering and sharing the latest and most exciting tech products in the market.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>  )
}

export default Banner