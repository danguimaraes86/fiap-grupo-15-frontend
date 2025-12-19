import { AuthErrorCodes } from 'firebase/auth';

export const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.EMAIL_EXISTS]: 'Este e-mail já está cadastrado.',
  [AuthErrorCodes.INVALID_EMAIL]: 'E-mail inválido.',
  [AuthErrorCodes.INVALID_PASSWORD]: 'Senha incorreta.',
  [AuthErrorCodes.USER_DELETED]: 'Usuário não encontrado.',
  [AuthErrorCodes.USER_DISABLED]: 'Esta conta foi desabilitada.',
  [AuthErrorCodes.WEAK_PASSWORD]: 'A senha deve ter pelo menos 6 caracteres.',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Muitas tentativas. Tente novamente mais tarde.',
  [AuthErrorCodes.NETWORK_REQUEST_FAILED]: 'Erro de conexão. Verifique sua internet.',
  [AuthErrorCodes.POPUP_BLOCKED]: 'Pop-up bloqueado pelo navegador.',
  [AuthErrorCodes.POPUP_CLOSED_BY_USER]: 'Pop-up fechado antes de completar o login.',
  [AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE]: 'Estas credenciais já estão em uso.',
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]: 'Credenciais inválidas.',
  [AuthErrorCodes.OPERATION_NOT_ALLOWED]: 'Operação não permitida.',
  [AuthErrorCodes.EXPIRED_OOB_CODE]: 'Código expirado.',
  [AuthErrorCodes.INVALID_OOB_CODE]: 'Código inválido.',
  [AuthErrorCodes.MISSING_PASSWORD]: 'Senha não informada.',
};

export function getFirebaseErrorMessage(errorCode: string): string {
  return FIREBASE_ERROR_MESSAGES[errorCode] || 'Erro desconhecido. Tente novamente.';
}