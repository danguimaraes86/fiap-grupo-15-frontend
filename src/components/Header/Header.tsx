export function Header() {
  return (
    <header className="bg-dark text-white px-3 py-2 d-flex justify-content-between align-items-center">
      <div className="d-md-none">
        <button
          className="btn btn-light btn-sm"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
        >
          ☰
        </button>
      </div>
      <div className="text-center flex-grow-1">
        <strong>Joana da Silva Oliveira</strong>
      </div>
      <div className="d-none d-md-block">
        <i className="bi bi-person-circle"></i>
      </div>
    </header>
  );
}