export function AuthErrorComponent({ mensagem }: { mensagem: string }) {
  return (
    <div className="alert alert-danger" style={{ textAlign: "center" }}>
      {mensagem}
    </div>
  );
}
