export const emailValidation = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Az email nem lehet üres!";
  }
  if (!emailRegex.test(email)) {
    return "Az email formátuma nem jó!";
  }
  return "";
};

export const passwordValidation = (password: string, confirm?: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=?]).+$/;
  if (!password) {
    return "A jelszó nem lehet üres!";
  }
  if (confirm !== undefined && password !== confirm) {
    return "A két jelszónak egyeznie kell!";
  }
  if (password.length < 8 || password.length > 15) {
    return "A jelszónak 8 és 15 karakter hosszúság között kell lennie!";
  }
  if (!passwordRegex.test(password)) {
    return "A jelszónak tartalmazia kell legalább egy számot, egy nagybetűt és egy speciális karatert ezek közül: !@#$%^&*()_-+=?";
  }
  return "";
};
