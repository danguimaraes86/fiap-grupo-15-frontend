type Props = {
  userName: string;
};

export function Header({ userName }: Props) {
  return (
    <header style={{ backgroundColor: '#004D61', color: 'white', padding: '0.5rem 0' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-xl-10 d-flex justify-content-between align-items-center px-3">
            <div className="d-md-none">
              <button
                className="btn btn-light btn-sm"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
              >
                ☰
              </button>
            </div>

            <div className="d-none d-md-flex align-items-center gap-4 ms-auto">
              <span className="pr-5" style={{ color: '#FFFFFF' }}>{userName}</span>
              <i className="bi bi-person-circle fs-5" style={{ color: '#FF5031' }}></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
