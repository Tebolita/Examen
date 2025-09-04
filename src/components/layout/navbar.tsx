function NavBar() {
  const iconosTecnologias = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
      alt: 'React Logo',
    },
    {
      src: 'https://es.vite.dev/logo.svg',
      alt: 'Vite Logo',
    },
    {
      src: 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
      alt: 'TypeScript Logo',
    },
  ];

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            <span className="navbar-brand text-white">Prueba Técnica</span> 
            <div className="d-flex align-items-center mx-2">
              {iconosTecnologias.map((icono, index) => (
                <img key={index} 
                src={icono.src} 
                alt={icono.alt} 
                width="30" height="24" className="d-inline-block align-text-top mx-1" />
              ))}
            </div>

            <span className="navbar-brand text-white"> Frontend </span> 
        </div>
      </nav>
    </>
  )
}

export default NavBar